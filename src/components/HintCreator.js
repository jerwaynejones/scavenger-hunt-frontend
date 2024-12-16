
import React, { useState } from 'react';
import api from '../api';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Alert,
} from '@mui/material';

function HintCreator({ themeName, huntId, onAddHint, onComplete }) {
    const [previousLocation, setPreviousLocation] = useState('');
    const [clue, setClue] = useState('');
    const [error, setError] = useState('');

    const generateClue = () => {
        if (!previousLocation) {
            setError('Please enter a previous location.');
            return;
        }
        api
            .post('/clues/generate', { themeName, previousLocation })
            .then((response) => {
                setClue(response.data.clue);
                setError('');
            })
            .catch(() => {
                setError('Error generating clue. Please try again.');
            });
    };

    const addHint = () => {
        api
            .put(`/hunts/${huntId}/steps`, { location: previousLocation, clue })
            .then((response) => {
                onAddHint(response.data.steps);
                setPreviousLocation('');
                setClue('');
                setError('');
            })
            .catch(() => {
                setError('Error adding hint. Please try again.');
            });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Create a Hint
            </Typography>
            {error && (
                <Alert severity="error" style={{ marginBottom: '1rem' }}>
                    {error}
                </Alert>
            )}
            <TextField
                fullWidth
                label="Previous Location"
                variant="outlined"
                value={previousLocation}
                onChange={(e) => setPreviousLocation(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />
            <Button variant="contained" color="primary" onClick={generateClue}>
                Generate Clue
            </Button>
            {clue && (
                <Card style={{ marginTop: '1rem' }}>
                    <CardContent>
                        <Typography variant="body1">{clue}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="secondary" onClick={addHint}>
                            Add Hint
                        </Button>
                    </CardActions>
                </Card>
            )}
            <Button
                variant="outlined"
                color="primary"
                onClick={onComplete}
                style={{ marginTop: '1rem' }}
            >
                Complete Scavenger Hunt
            </Button>
        </Container>
    );
}

export default HintCreator;
