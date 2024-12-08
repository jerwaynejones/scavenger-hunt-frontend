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
            setClues(hunt.steps.map(s => s.clue));
            setLocations(hunt.steps.map(s => s.location));
            setFinalLocation(hunt.finalGiftLocation || '');
            setCurrentStep(2); // Go directly to print step
        } catch (error) {
            console.error('No hunt found or error fetching hunt:', error);
            setCurrentStep(0);
        }
    }, [setExistingHunt, setHuntToken, setClues, setLocations, setFinalLocation, setCurrentStep]);

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        if (pathParts[0] === 'hunt' && pathParts[1]) {
            const token = pathParts[1];
            fetchHunt(token);
        }
    }, [location, fetchHunt]);

    const handleGiftDescriptionSubmit = async ({giftDescription, finalLocation, difficultyLevel}) => {
        setGiftDescription(giftDescription);
        setFinalLocation(finalLocation);
        setDifficultyLevel(difficultyLevel);
        setLoadingTheme(true);

        try {
            // Generate the narrative theme
            const themeResponse = await api.post('/theme/generate', {giftDescription});
            const generatedTheme = themeResponse.data.theme;
            setNarrativeTheme(generatedTheme);

            setLoadingTheme(false);
            setLoadingInitialClue(true);

            // Generate the first clue using the narrative theme
            const clueResponse = await api.post('/clues/generate', {
                theme: generatedTheme,
                giftDescription,
                previousLocation: '',
                nextLocation: finalLocation,
                difficultyLevel,
            });

            setInitialClue(clueResponse.data.clue);
            setCurrentStep(1);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            setLoadingTheme(false);
            setLoadingInitialClue(false);
        }
    };

    const handleCluesComplete = async ({clues, locations}) => {
        setClues(clues);
        setLocations(locations);


        try {
            const response = await api.post('/hunts/save', {
                theme: narrativeTheme,
                steps: clues.map((clue, index) => ({clue, location: locations[index]})),
                finalGiftLocation: finalLocation
            });

            const {token} = response.data;

            if (!token) {
                console.error('No token returned from the server response:', response.data)
                alert('Error saving hunt. Please try again.');
            }
            setHuntToken(token);


            navigate(`/hunt/${token}`);
        } catch (error) {
            console.error('Error saving hunt:', error);
            alert('Error saving hunt. Please try again.');
        }
    };

    const handleBackFromPrint = () => {
        setCurrentStep(1);
        setExistingHunt(null);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <Container maxWidth="sm" sx={{py: 1}} display='flex'>
                <Typography variant="h2" alignSelf='center'>
                    <img src={Logo} alt="ScavengerHuntWizard.com" className="logo"/>
                </Typography>
            </Container>

            <Container maxWidth="md" style={{marginTop: '2rem'}}>
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
                        {currentStep === 0 && (
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
                                <ClueGenerator
                                    theme={narrativeTheme}
                                    giftDescription={giftDescription}
                                    finalLocation={finalLocation}
                                    difficultyLevel={difficultyLevel}
                                    initialClue={initialClue}
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
            </Container>
        </ThemeProvider>
    );
}

export default App;
