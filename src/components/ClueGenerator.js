import React, { useState } from 'react';
import api from '../api';
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Box,
    Paper,
    Stack,
    Divider
} from '@mui/material';

function ClueGenerator({
                           theme,
                           giftDescription,
                           finalLocation,
                           difficultyLevel,
                           initialClue,
                           onComplete
                       }) {
    // Start with one initial clue unlabeled.
    const [clues, setClues] = useState([initialClue]);
    const [locations, setLocations] = useState([]); // labels for clues: locations[i] labels clues[i]
    const [roomName, setRoomName] = useState('');
    const [hidingSpotDescription, setHidingSpotDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [regenerations, setRegenerations] = useState(0);

    const generateClue = async (isRegeneration = false) => {
        if (!isRegeneration && (!roomName.trim() || !hidingSpotDescription.trim())) {
            alert('Please describe the location for this clue.');
            return;
        }

        setLoading(true);

        const updatedClues = [...clues];
        const updatedLocations = [...locations];

        // If not regenerating and there's an unlabeled clue (clues.length > locations.length),
        // label it with the new user-provided location.
        if (!isRegeneration && clues.length > locations.length) {
            const newLabel = `${roomName.trim()} - ${hidingSpotDescription.trim()}`;
            updatedLocations.push(newLabel);
        }

        // Determine previousLocation for the API call:
        // If we have no labeled locations, the first clue was at finalLocation.
        // If we have labeled locations, the previous location is the last labeled location.
        let previousLocation = finalLocation;
        if (updatedLocations.length > 0) {
            previousLocation = updatedLocations[updatedLocations.length - 1];
        }

        // For regeneration, nextLocation doesn't change labeling logic,
        // just regenerates clue text. For new clues, nextLocation is user input.
        const nextLocation = isRegeneration
            ? (updatedLocations.length > 0 ? updatedLocations[updatedLocations.length - 1] : finalLocation)
            : `${roomName.trim()} - ${hidingSpotDescription.trim()}`;

        try {
            const response = await api.post('/clues/generate', {
                theme,
                giftDescription,
                previousLocation,
                nextLocation,
                difficultyLevel,
            });

            const newClue = response.data.clue;

            if (isRegeneration) {
                // Regenerate the last clue with new text
                updatedClues[updatedClues.length - 1] = newClue;
                setClues(updatedClues);
                setRegenerations(regenerations + 1);
            } else {
                // Add the new clue unlabeled at the end
                updatedClues.push(newClue);
                setClues(updatedClues);
                setLocations(updatedLocations);
                setRegenerations(0);

                // Clear the input fields after generation
                setRoomName('');
                setHidingSpotDescription('');
            }

        } catch (error) {
            console.error('Error generating clue:', error);
            alert('Error generating clue. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerate = () => {
        if (regenerations < 3) {
            if (!roomName.trim() || !hidingSpotDescription.trim()) {
                alert('Please provide location details before regenerating.');
                return;
            }
            generateClue(true);
        } else {
            alert('You have reached the maximum number of regenerations for this clue.');
        }
    };

    const handleComplete = () => {
        // On completion, the last clue remains unlabeled if no next clue was generated.
        onComplete({ clues, locations });
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Generate Your Clues
                </Typography>

                <List sx={{ mb: 2 }}>
                    {clues.map((clue, index) => {
                        const label = index < locations.length ? locations[index] : '';
                        return (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={label ? <Typography variant="h6">{label}</Typography> : ''}
                                        secondary={
                                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                                                {clue.replace(/\r?\n|\r/g, '')}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < clues.length - 1 && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        );
                    })}
                </List>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            Describe the location where we'll hide this clue
                            {/* Optional star icon for flair */}
                            <Box component="span" sx={{ ml: 1, verticalAlign: 'middle' }}>
                                <Box
                                    component="span"
                                    sx={{
                                        width: '16px',
                                        height: '16px',
                                        display: 'inline-block',
                                        background: `url('/assets/star-icon.png') no-repeat center center`,
                                        backgroundSize: 'contain'
                                    }}
                                />
                            </Box>
                        </Typography>
                        <TextField
                            label="Room Name"
                            variant="outlined"
                            fullWidth
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="e.g., Bathroom"
                        />
                        <TextField
                            label="Hiding Spot Description"
                            variant="outlined"
                            fullWidth
                            value={hidingSpotDescription}
                            onChange={(e) => setHidingSpotDescription(e.target.value)}
                            placeholder="e.g., under the toothbrushes"
                        />

                        <Button variant="contained" color="primary" onClick={() => generateClue()} fullWidth>
                            Generate Next Clue
                        </Button>
                        {clues.length > 0 && regenerations < 3 && (
                            <Button variant="outlined" color="secondary" onClick={handleRegenerate} fullWidth>
                                Regenerate This Clue ({regenerations}/3)
                            </Button>
                        )}
                        <Button variant="outlined" color="secondary" onClick={handleComplete} fullWidth>
                            Finish and View Scavenger Hunt
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
}

export default ClueGenerator;
