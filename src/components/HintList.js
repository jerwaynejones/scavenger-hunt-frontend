import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';

function HintList({ steps }) {
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Scavenger Hunt Hints
            </Typography>
            <Grid container spacing={2}>
                {steps.map((step, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={2} style={{ padding: '1rem' }}>
                            <List>
                                {clues.map((clue, index) => (
                                    <ListItem key={index}>
                                        {/* Reverse the numbering so the first clue in the array is highest-numbered */}
                                        <ListItemText
                                            primary={`Clue ${clues.length - index}`}
                                            secondary={clue}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default HintList;
