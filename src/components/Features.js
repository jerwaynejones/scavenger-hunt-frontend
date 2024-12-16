// src/components/Features.js
import React from 'react';
import Grid from '@mui/material/Grid2';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Create, Print } from '@mui/icons-material';

function Features() {
    const featureList = [
        {
            icon: <Create fontSize="large" sx={{ color: '#fab70b' }} />,
            title: 'AI-Powered Clue Generation',
            description: 'Automatically generate creative and challenging clues tailored to your theme and difficulty level.',
        },
        {
            icon: <Print fontSize="large" sx={{ color: '#fab70b' }} />,
            title: 'Printable Clue Cards',
            description: 'Easily print out your scavenger hunt clues on high-quality cards for a tangible experience.',
        },
    ];

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ position: 'relative', mb: 4 }}>
                Features
                <Box
                    sx={{
                        width: '50px',
                        height: '4px',
                        backgroundColor: (theme) => theme.palette.primary.main,
                        margin: '0 auto',
                        mt: 1,
                        borderRadius: 2
                    }}
                />
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
                {featureList.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                borderRadius: 2,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.15)'
                                }
                            }}
                        >
                            {feature.icon}
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body1">
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Features;
