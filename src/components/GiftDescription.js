// src/components/GiftDescription.js
import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Box,
    Paper,
    Stack,
} from '@mui/material';

function GiftDescription({ onSubmit, loading }) {
    const [giftDescription, setGiftDescription] = useState('');
    const [finalLocation, setFinalLocation] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Medium');

    const handleSubmit = () => {
        if (giftDescription && finalLocation) {
            onSubmit({ giftDescription, finalLocation, difficultyLevel });
        } else {
            alert('Please provide the gift description and final hiding place.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Create Your Scavenger Hunt
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            label="Gift Description"
                            variant="outlined"
                            fullWidth
                            value={giftDescription}
                            onChange={(e) => setGiftDescription(e.target.value)}
                            disabled={loading}
                            placeholder="e.g., A Lego Set of the Hogwarts Castle"
                        />
                        <TextField
                            label="Final Hiding Place"
                            variant="outlined"
                            fullWidth
                            value={finalLocation}
                            onChange={(e) => setFinalLocation(e.target.value)}
                            disabled={loading}
                            placeholder="e.g., Under the bed in the master bedroom"
                        />
                        <FormControl fullWidth variant="outlined" disabled={loading}>
                            <InputLabel id="difficulty-select-label">Difficulty Level</InputLabel>
                            <Select
                                variant='outlined'
                                labelId="difficulty-select-label"
                                value={difficultyLevel}
                                onChange={(e) => setDifficultyLevel(e.target.value)}
                                label="Difficulty Level"
                            >
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Hard">Hard</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={loading}>
                            Generate First Clue
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
}

export default GiftDescription;
