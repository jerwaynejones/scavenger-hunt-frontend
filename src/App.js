// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import GiftDescription from './components/GiftDescription';
import ClueGenerator from './components/ClueGenerator';
import PrintOutput from './components/PrintOutput';
import AdSlot from './components/Ad'; // Imported AdSlot
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from './muiTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import api from './api';
import Logo from './assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
    const [giftDescription, setGiftDescription] = useState('');
    const [finalLocation, setFinalLocation] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Medium');
    const [narrativeTheme, setNarrativeTheme] = useState('');
    const [clues, setClues] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentStep, setCurrentStep] = useState(-1);
    const [initialClue, setInitialClue] = useState('');
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [loadingInitialClue, setLoadingInitialClue] = useState(false);
    const [huntToken, setHuntToken] = useState('');
    const [existingHunt, setExistingHunt] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        setCurrentStep(0);
    };

    const fetchHunt = useCallback(async (token) => {
        console.log(`Fetching hunt with token: ${token}`);
        try {
            const response = await api.get(`/hunts/${token}`);
            const hunt = response.data;
            setExistingHunt(hunt);

            if (hunt.steps && Array.isArray(hunt.steps)) {
                setClues(hunt.steps.map(s => s.clue));
                setLocations(hunt.steps.map(s => s.location));
            }

            setFinalLocation(hunt.finalGiftLocation || '');
            if (hunt.giftDescription) {
                setGiftDescription(hunt.giftDescription);
            }

            if (hunt.theme && hunt.theme.trim()) {
                setNarrativeTheme(hunt.theme);
            }

            setCurrentStep(2);
        } catch (error) {
            console.error('Error fetching hunt:', error);
            alert('Unable to retrieve the hunt. Please check the URL or try again.');
            setCurrentStep(0);
        }
    }, []);

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        if (pathParts[0] === 'hunt' && pathParts[1]) {
            const token = pathParts[1];
            fetchHunt(token);
        }
    }, [location, fetchHunt]);

    const handleGiftDescriptionSubmit = async ({ giftDescription, finalLocation, difficultyLevel }) => {
        setGiftDescription(giftDescription);
        setFinalLocation(finalLocation);
        setDifficultyLevel(difficultyLevel);
        setLoadingTheme(true);
        setLoadingInitialClue(true);

        try {
            const themeResponse = await api.post('/theme/generate', { giftDescription });
            const generatedTheme = themeResponse.data.theme;
            setNarrativeTheme(generatedTheme);

            const clueResponse = await api.post('/clues/generate', {
                theme: generatedTheme,
                giftDescription,
                previousLocation: '',
                nextLocation: finalLocation,
                difficultyLevel,
            });

            const firstClue = clueResponse.data.clue;
            setInitialClue(firstClue);
            setClues([firstClue]);

            setLoadingTheme(false);
            setLoadingInitialClue(false);
            setCurrentStep(1);
        } catch (error) {
            console.error('Error in handleGiftDescriptionSubmit:', error);
            alert('An error occurred while generating the theme or initial clue. Please try again.');
            setLoadingTheme(false);
            setLoadingInitialClue(false);
        }
    };

    const handleCluesComplete = async ({ clues, locations }) => {
        setClues(clues);
        setLocations(locations);

        try {
            const response = await api.post('/hunts/save', {
                theme: narrativeTheme,
                giftDescription,
                steps: clues.map((clue, index) => ({ clue, location: locations[index] })),
                finalGiftLocation: finalLocation
            });
            const { token } = response.data;
            setHuntToken(token);
            navigate(`/hunt/${token}`);
        } catch (error) {
            console.error('Error saving hunt:', error);
            alert('Error saving hunt. Please try again.');
        }
    };

    const handleBackFromPrint = () => {
        if (existingHunt) {
            setClues(existingHunt.steps.map(s => s.clue));
            setLocations(existingHunt.steps.map(s => s.location));
        }
        setCurrentStep(1);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ py: 1 }} display='flex'>
                <Typography variant="h2" alignSelf='center'>
                    <img src={Logo} alt="ScavengerHuntWizard Logo" className="logo" />
                </Typography>
            </Container>

            <Container maxWidth="md" style={{ marginTop: '2rem' }}>
                {(existingHunt && currentStep !== 1) ? (
                    <>
                        <PrintOutput
                            hunt={{
                                steps: clues.map((clue, index) => ({
                                    clue,
                                    location: locations[index],
                                })),
                                finalGiftLocation: finalLocation,
                            }}
                            onBack={handleBackFromPrint}
                        />
                        {/* Optional: Insert a vertical ad after viewing the print output */}
                        <Box sx={{ my: 4 }}>
                            <AdSlot
                                client="ca-pub-9243474032873313"
                                slot="5348702667"  // vertical responsive ad slot ID
                                format="auto"
                                responsive="true"
                                style={{ display: 'block' }}
                            />
                        </Box>
                    </>
                ) : (
                    <>
                        {currentStep >= 0 && !existingHunt && (
                            <Stepper activeStep={currentStep} alternativeLabel>
                                <Step>
                                    <StepLabel>Describe Gift & Final Location</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Generate Clues</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Complete</StepLabel>
                                </Step>
                            </Stepper>
                        )}

                        {currentStep === -1 && !existingHunt && (
                            <>
                                <Hero onGetStarted={handleGetStarted} />
                                <Features />
                                <HowItWorks />
                                <Benefits />
                                <Testimonials />
                                <CTA onGetStarted={handleGetStarted} />
                            </>
                        )}

                        {currentStep === 0 && !existingHunt && (
                            <>
                                <GiftDescription
                                    onSubmit={handleGiftDescriptionSubmit}
                                    loading={loadingTheme || loadingInitialClue}
                                />
                                {/* Insert a horizontal ad after the GiftDescription form */}
                                <Box sx={{ my: 4 }}>
                                    <AdSlot
                                        client="ca-pub-9243474032873313"
                                        slot="7908886004"  // horizontal responsive ad slot ID
                                        format="auto"
                                        responsive="true"
                                        style={{ display: 'block' }}
                                    />
                                </Box>
                            </>
                        )}

                        {currentStep === 1 && (
                            <>
                                {!giftDescription.trim() || !narrativeTheme.trim() ? (
                                    <Typography>Loading hunt data...</Typography>
                                ) : (
                                    <>
                                        <ClueGenerator
                                            theme={narrativeTheme}
                                            giftDescription={giftDescription}
                                            finalLocation={finalLocation}
                                            difficultyLevel={difficultyLevel}
                                            initialClue={initialClue}
                                            clues={clues}
                                            locations={locations}
                                            setClues={setClues}
                                            setLocations={setLocations}
                                            onComplete={handleCluesComplete}
                                        />
                                        {/* Insert a vertical ad after the ClueGenerator */}
                                        <Box sx={{ my: 4 }}>
                                            <AdSlot
                                                client="ca-pub-9243474032873313"
                                                slot="5348702667"  // vertical responsive ad slot ID
                                                format="auto"
                                                responsive="true"
                                                style={{ display: 'block' }}
                                            />
                                        </Box>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Container>

            <Footer />
        </ThemeProvider>
    );

}

export default App;
