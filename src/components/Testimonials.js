// src/components/Testimonials.js
import React from 'react';
import Grid from '@mui/material/Grid2';
import { Container, Typography, Paper, Avatar, Box } from '@mui/material';
import testimonial1 from '../assets/testimonial1.png';
import testimonial2 from '../assets/testimonial2.png';
import testimonial3 from '../assets/testimonial3.png';
function Testimonials() {
    const testimonials = [
        {
            name: 'Jennifer S.',
            feedback: 'I make a scavenger hunt every year for my family and this is going to make it so easy and fun!',
            avatar: testimonial3,
        },
        {
            name: 'Joe J.',
            feedback: 'This is fantastic! We do scavenger hunts all the time, so my wife is going to love this!',
            avatar: testimonial2,
        },
        {
            name: 'Gwyn J.',
            feedback: "It's really cool and so easy anytime you want to make a scavenger hunt for your kids, your friends, or anyone really!",
            avatar: testimonial1,
        },
    ];

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ position: 'relative', mb: 4 }}>
                What Our Users Say
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
                {testimonials.map((testimonial, index) => (
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
                            <Avatar
                                alt={`Avatar of ${testimonial.name}`}
                                src={testimonial.avatar}
                                sx={{ width: 80, height: 80, margin: '0 auto 1rem' }}
                            />
                            <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                                {testimonial.name}
                            </Typography>
                            <Typography variant="body1">"{testimonial.feedback}"</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Testimonials;
