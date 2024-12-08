// src/App.js
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

function App() {
    const [giftDescription, setGiftDescription] = useState('');
    const [finalLocation, setFinalLocation] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Medium');
    const [narrativeTheme, setNarrativeTheme] = useState('');
    const [clues, setClues] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [initialClue, setInitialClue] = useState('');
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [loadingInitialClue, setLoadingInitialClue] = useState(false);
    const [huntToken, setHuntToken] = useState('');
    const [existingHunt, setExistingHunt] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchHunt = useCallback(async (token) => {
        try {
            const response = await api.get(`/hunts/${token}`);
            const hunt = response.data;

            setExistingHunt(hunt);
            setHuntToken(token);

            // Set clues and locations from the hunt data
            setClues(hunt.steps.map(s => s.clue));
            setLocations(hunt.steps.map(s => s.location));
            setFinalLocation(hunt.finalGiftLocation || '');

            // Retrieve giftDescription and theme from the hunt
            if (hunt.giftDescription) {
                setGiftDescription(hunt.giftDescription);
            }

            if (hunt.theme && hunt.theme.trim()) {
                setNarrativeTheme(hunt.theme);
            }

            // Since we have an existing hunt, go directly to the print step
            setCurrentStep(2);
        } catch (error) {
            console.error('No hunt found or error fetching hunt:', error);
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

            if (!generatedTheme || !generatedTheme.trim()) {
                throw new Error('The generated theme is empty. Please try again.');
            }

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

            // Add the initial clue to the clues array
            setClues([firstClue]);

            setLoadingTheme(false);
            setLoadingInitialClue(false);
            setCurrentStep(1);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
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
                giftDescription, // Ensure giftDescription is saved to the hunt
                steps: clues.map((clue, index) => ({ clue, location: locations[index] })),
                finalGiftLocation: finalLocation
            });

            const { token } = response.data;

            if (!token) {
                console.error('No token returned from the server response:', response.data);
                alert('Error saving hunt. Please try again.');
                return;
            }

            setHuntToken(token);
            navigate(`/hunt/${token}`);
        } catch (error) {
            console.error('Error saving hunt:', error);
            alert('Error saving hunt. Please try again.');
        }
    };

    const handleBackFromPrint = () => {
        // Return to step 1 to allow adding more clues if desired
        setCurrentStep(1);
        setExistingHunt(null);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ py: 1 }} display='flex'>
                <Typography variant="h2" alignSelf='center'>
                    <img src={Logo} alt="ScavengerHuntWizard.com" className="logo" />
                </Typography>
            </Container>

            <Container maxWidth="md" style={{ marginTop: '2rem' }}>
                <Stepper activeStep={existingHunt ? 2 : currentStep} alternativeLabel>
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

                {existingHunt ? (
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
                        <Box sx={{ my: 4 }}>
                            <AdSlot
                                client="ca-pub-9243474032873313"
                                slot="xxxxxxxxxx"
                                format="auto"
                                responsive="true"
                                style={{ display: 'block' }}
                            />
                        </Box>
                    </>
                ) : (
                    <>
                        {currentStep === 0 && (
                            <>
                                <GiftDescription
                                    onSubmit={handleGiftDescriptionSubmit}
                                    loading={loadingTheme || loadingInitialClue}
                                />
                                <Box sx={{ my: 4 }}>
                                    <AdSlot
                                        client="ca-pub-9243474032873313"
                                        slot="xxxxxxxxxx"
                                        format="auto"
                                        responsive="true"
                                        style={{ display: 'block' }}
                                    />
                                </Box>
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                {/* ClueGenerator only renders once we have theme and giftDescription */}
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
                                        <Box sx={{ my: 4 }}>
                                            <AdSlot
                                                client="ca-pub-9243474032873313"
                                                slot="xxxxxxxxxx"
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
        </ThemeProvider>
    );
}

export default App;
