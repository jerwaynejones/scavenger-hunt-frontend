// src/components/HowItWorks.js
import React from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography, Paper, Box } from '@mui/material';
import { PersonAdd, Gavel, Flag } from '@mui/icons-material';

function HowItWorks() {
  const steps = [
    {
      icon: <PersonAdd fontSize="large" sx={{ color: '#fab70b' }} />,
      title: 'Describe Your Gift and Hiding Place',
      description: 'Provide a description of the gift and its hiding place to tailor the scavenger hunt to your unique surprise.',
    },
    {
      icon: <Gavel fontSize="large" sx={{ color: '#fab70b' }} />,
      title: 'Generate Clues',
      description: 'Use our AI-powered tool to create engaging and themed clues. Just describe the room and hiding spot for each clue.',
    },
    {
      icon: <Flag fontSize="large" sx={{ color: '#fab70b' }} />,
      title: 'Print & Play',
      description: 'Print out your custom clue cards and set up the scavenger hunt for a memorable adventure.',
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ position: 'relative', mb: 4 }}>
        How It Works
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
        {steps.map((step, index) => (
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
              {step.icon}
              <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body1">{step.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HowItWorks;
