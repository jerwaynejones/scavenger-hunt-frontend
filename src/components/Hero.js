// src/components/Hero.js
import React from 'react';
import { Container, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import heroBackground from '../assets/hero-background.png';

function Hero({ onGetStarted }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                position: 'relative',
                // Make the hero at least 80% of the viewport height on larger screens,
                // and slightly smaller on mobile so it fits better.
                minHeight: isMobile ? '60vh' : '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(
                  rgba(0,0,0,0.4), 
                  rgba(0,0,0,0.4)
                ), url(${heroBackground}) center/cover no-repeat`,
                color: '#FFFFFF',
                textAlign: 'center',
                padding: '2rem'
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    sx={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        mb: 2,
                        fontSize: isMobile ? '2rem' : '3rem'
                    }}
                >
                    Create Magical, Custom Scavenger Hunts with AI
                </Typography>

                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        mb: 3,
                        fontSize: isMobile ? '1.25rem' : '1.5rem'
                    }}
                >
                    Design enchanting scavenger hunts tailored to any occasion. Perfect for parties, classrooms, and memorable gift reveals!
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#fab70b',
                        '&:hover': { backgroundColor: '#FFD700' },
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        padding: '0.75rem 1.5rem'
                    }}
                    onClick={onGetStarted}
                >
                    Get Started
                </Button>
            </Container>
        </Box>
    );
}

export default Hero;
