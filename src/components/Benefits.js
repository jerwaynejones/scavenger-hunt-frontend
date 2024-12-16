// src/components/Benefits.js
import React from 'react';
import { Container, Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

function Benefits() {
    const benefits = [
        'Save Time: Quickly generate multiple clues without the hassle of brainstorming each one manually.',
        'Enhance Creativity: Utilize AI to create unique and engaging clues that captivate participants.',
        'Easy Sharing: Share your scavenger hunt digitally or via printed clue cards effortlessly.',
        'Scalability: Create hunts for small gatherings or large events with ease.',
    ];

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ position: 'relative', mb: 4 }}>
                Why Choose ScavengerHuntWizard?
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
            <List sx={{ maxWidth: '700px', margin: '0 auto' }}>
                {benefits.map((benefit, index) => (
                    <ListItem
                        key={index}
                        sx={{ mb: 2 }} // Add space between items
                    >
                        <ListItemIcon>
                            <CheckCircle sx={{ color: '#fab70b', fontSize: '1.5rem' }} />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.1rem', color: '#FFFFFF' } }}
                            primary={benefit}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Benefits;
