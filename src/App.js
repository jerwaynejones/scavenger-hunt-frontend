import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import GiftDescription from './components/GiftDescription';
import ClueGenerator from './components/ClueGenerator';
import PrintOutput from './components/PrintOutput';
import AdSlot from './components/Ad';
import {ThemeProvider} from '@mui/material/styles';
import muiTheme from './muiTheme';
import CssBaseline from '@mui/material/CssBaseline';
import {Container, Stepper, Step, StepLabel, Typography, Box} from '@mui/material';
import api from './api';
import Logo from './assets/logo.png';
import {useLocation, useNavigate} from 'react-router-dom';
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
    const [currentStep, setCurrentStep] = useState(-1); // Start with -1 to show homepage content first
    const [initialClue, setInitialClue] = useState('');
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [loadingInitialClue, setLoadingInitialClue] = useState(false);
    const [huntToken, setHuntToken] = useState('');
    const [existingHunt, setExistingHunt] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // Define handleGetStarted to move from homepage to the first step
    const handleGetStarted = () => {
        setCurrentStep(0);
    };

    const fetchHunt = useCallback(async (token) => {
        console.log(`Fetching hunt with token: ${token}`);
        try {
            const response = await api.get(`/hunts/${token}`);
            console.log('API Response for fetchHunt:', response.data);

            const hunt = response.data;

            if (!hunt) {
                console.error('Hunt data is undefined or null.');
                // throw new Error('Invalid hunt data.');
            }

            setExistingHunt(hunt);
            setHuntToken(token);
            console.log('Existing hunt set:', hunt);

            if (hunt.steps && Array.isArray(hunt.steps)) {
                setClues(hunt.steps.map(s => s.clue));
                setLocations(hunt.steps.map(s => s.location));
                console.log('Clues set from existing hunt:', hunt.steps.map(s => s.clue));
                console.log('Locations set from existing hunt:', hunt.steps.map(s => s.location));
            } else {
                console.warn('Hunt.steps is not an array or is undefined.');
            }

            setFinalLocation(hunt.finalGiftLocation || '');
            console.log('Final location set:', hunt.finalGiftLocation || '');

            if (hunt.giftDescription) {
                setGiftDescription(hunt.giftDescription);
                console.log('Gift description set from existing hunt:', hunt.giftDescription);
            } else {
                console.warn('Gift description is missing in the existing hunt.');
            }

            if (hunt.theme && hunt.theme.trim()) {
                setNarrativeTheme(hunt.theme);
                console.log('Narrative theme set from existing hunt:', hunt.theme);
            } else {
                console.warn('Narrative theme is missing or empty in the existing hunt.');
            }

            setCurrentStep(2);
            console.log('Current step set to 2 (Complete)');
        } catch (error) {
            console.error('Error fetching hunt:', error);
            alert('Unable to retrieve the hunt. Please check the URL or try again.');
            setCurrentStep(0);
        }
    }, []);

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        console.log('Current pathname:', location.pathname);
        console.log('Parsed path parts:', pathParts);

        if (pathParts[0] === 'hunt' && pathParts[1]) {
            const token = pathParts[1];
            fetchHunt(token);
        } else {
            console.log('No hunt token found in the URL.');
        }
    }, [location, fetchHunt]);

    const handleGiftDescriptionSubmit = async ({giftDescription, finalLocation, difficultyLevel}) => {
        console.log('handleGiftDescriptionSubmit called with:', {giftDescription, finalLocation, difficultyLevel});
        setGiftDescription(giftDescription);
        setFinalLocation(finalLocation);
        setDifficultyLevel(difficultyLevel);
        setLoadingTheme(true);
        setLoadingInitialClue(true);

        try {
            const themeResponse = await api.post('/theme/generate', {giftDescription});
            console.log('API Response for theme generation:', themeResponse.data);

            const generatedTheme = themeResponse.data.theme;

            if (!generatedTheme || !generatedTheme.trim()) {
                console.error('Generated theme is empty.');
                // throw new Error('The generated theme is empty. Please try again.');
            }

            setNarrativeTheme(generatedTheme);
            console.log('Narrative theme set:', generatedTheme);

            const clueResponse = await api.post('/clues/generate', {
                theme: generatedTheme,
                giftDescription,
                previousLocation: '',
                nextLocation: finalLocation,
                difficultyLevel,
            });
            console.log('API Response for initial clue generation:', clueResponse.data);

            const firstClue = clueResponse.data.clue;
            setInitialClue(firstClue);
            console.log('Initial clue set:', firstClue);

            setClues([firstClue]);
            console.log('Clues array after adding initial clue:', [firstClue]);

            setLoadingTheme(false);
            setLoadingInitialClue(false);
            setCurrentStep(1);
            console.log('Current step set to 1 (Generate Clues)');
        } catch (error) {
            console.error('Error in handleGiftDescriptionSubmit:', error);
            alert('An error occurred while generating the theme or initial clue. Please try again.');
            setLoadingTheme(false);
            setLoadingInitialClue(false);
        }
    };

    const handleCluesComplete = async ({clues, locations}) => {
        console.log('handleCluesComplete called with:', {clues, locations});
        setClues(clues);
        setLocations(locations);

        try {
            const response = await api.post('/hunts/save', {
                theme: narrativeTheme,
                giftDescription,
                steps: clues.map((clue, index) => ({clue, location: locations[index]})),
                finalGiftLocation: finalLocation
            });
            console.log('API Response for saving hunt:', response.data);

            const {token} = response.data;

            if (!token) {
                console.error('No token returned from the server response:', response.data);
                alert('Error saving hunt. Please try again.');
                return;
            }

            setHuntToken(token);
            console.log('Hunt token set after saving:', token);
            navigate(`/hunt/${token}`);
            console.log(`Navigated to /hunt/${token}`);
        } catch (error) {
            console.error('Error saving hunt:', error);
            alert('Error saving hunt. Please try again.');
        }
    };

    const handleBackFromPrint = () => {
        console.log('handleBackFromPrint called.');
        if (existingHunt) {
            console.log('Existing hunt data:', existingHunt);
            setClues(existingHunt.steps.map(s => s.clue));
            setLocations(existingHunt.steps.map(s => s.location));
            console.log('Clues reset:', existingHunt.steps.map(s => s.clue));
            console.log('Locations reset:', existingHunt.steps.map(s => s.location));
        } else {
            console.error('No existing hunt data available to reset state.');
        }

        // Navigate back to clue generation step
        setCurrentStep(1);
        console.log('Navigating back to clue generation.');
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <Container maxWidth="sm" sx={{py: 1}} display='flex'>
                <Typography variant="h2" alignSelf='center'>
                    <img src={Logo} alt="ScavengerHuntWizard Logo" className="logo"/>
                </Typography>
            </Container>

            <Container maxWidth="md" style={{marginTop: '2rem'}}>
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
                        <Box sx={{my: 4}}>
                            <AdSlot
                                client="ca-pub-9243474032873313"
                                slot="xxxxxxxxxx"
                                format="auto"
                                responsive="true"
                                style={{display: 'block'}}
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
                                <Hero onGetStarted={handleGetStarted}/>
                                <Features/>
                                <HowItWorks/>
                                <Benefits/>
                                <Testimonials/>
                                <CTA onGetStarted={handleGetStarted}/>
                            </>
                        )}

                        {currentStep === 0 && !existingHunt && (
                            <>
                                <GiftDescription
                                    onSubmit={handleGiftDescriptionSubmit}
                                    loading={loadingTheme || loadingInitialClue}
                                />
                                <Box sx={{my: 4}}>
                                    <AdSlot
                                        client="ca-pub-9243474032873313"
                                        slot="xxxxxxxxxx"
                                        format="auto"
                                        responsive="true"
                                        style={{display: 'block'}}
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
                                        <Box sx={{my: 4}}>
                                            <AdSlot
                                                client="ca-pub-9243474032873313"
                                                slot="xxxxxxxxxx"
                                                format="auto"
                                                responsive="true"
                                                style={{display: 'block'}}
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
