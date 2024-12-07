// src/components/LocationInput.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

function LocationInput({ onLocationsSubmit }) {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);

    const addLocation = () => {
        if (location) {
            setLocations([location, ...locations]); // Add to the beginning for reverse order
            setLocation('');
        }
    };

    const handleSubmit = () => {
        if (locations.length > 0) {
            onLocationsSubmit(locations);
        } else {
            alert('Please add at least one location.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Enter Hiding Places
            </Typography>
            <TextField
                label="Clue Location"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />
            <Button variant="contained" color="primary" onClick={addLocation} fullWidth>
                Add Location
            </Button>
            {locations.length > 0 && (
                <>
                    <Typography variant="h6" style={{ marginTop: '1rem' }}>
                        Locations List (Clues will lead to these locations in order):
                    </Typography>
                    <List>
                        {locations.map((loc, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`Location ${locations.length - index}: ${loc}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained" color="secondary" onClick={handleSubmit} fullWidth>
                        Generate Clues
                    </Button>
                </>
            )}
        </Container>
    );
}

export default LocationInput;
