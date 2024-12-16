// src/components/Footer.js
import React from 'react';
import { Container, Typography,  Box } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ backgroundColor: '#1E1E1E', color: '#CCCCCC', py: 3, mt: 4 }}>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} ScavengerHuntWizard. All rights reserved.
                </Typography>
                <Box sx={{ mt: 1 }}>
                    {/*<Link href="/privacy" color="secondary" sx={{ mx: 1 }}>*/}
                    {/*    Privacy Policy*/}
                    {/*</Link>*/}
                    {/*<Link href="/terms" color="secondary" sx={{ mx: 1 }}>*/}
                    {/*    Terms of Service*/}
                    {/*</Link>*/}

                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
