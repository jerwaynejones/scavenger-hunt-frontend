// src/components/CTA.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

function CTA({ onGetStarted }) {
    return (
        <Box
            sx={{
                // Add a gradient overlay for more depth
                background: `linear-gradient(135deg, #5D3FD3 0%, #4E32B9 50%, #2E1A93 100%)`,
                color: '#FFFFFF',
                py: 8,
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom sx={{ position: 'relative', mb: 2 }}>
                    Ready to Create Your Custom Scavenger Hunt?
                    <Box
                        sx={{
                            width: '50px',
                            height: '4px',
                            backgroundColor: (theme) => theme.palette.secondary.main,
                            margin: '0 auto',
                            mt: 1,
                            borderRadius: 2
                        }}
                    />
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 4, color: '#DDDDDD' }}>
                    Let ScavengerHuntWizard guide you through crafting an unforgettable adventure.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onGetStarted}
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        padding: '0.75rem 2rem',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.4)',
                        '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0px 6px 15px rgba(0,0,0,0.4)'
                        }
                    }}
                >
                    Get Started Now
                </Button>
            </Container>
        </Box>
    );
}

export default CTA;
