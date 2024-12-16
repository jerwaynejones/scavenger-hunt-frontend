import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Link as MuiLink,
  Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

function Footer() {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [privacyContent, setPrivacyContent] = useState('');
  const [termsContent, setTermsContent] = useState('');

  useEffect(() => {
    fetch('/constants/privacy.md')
      .then(response => response.text())
      .then(text => setPrivacyContent(text));

    fetch('/constants/terms.md')
      .then(response => response.text())
      .then(text => setTermsContent(text));
  }, []);

  const handleOpenPrivacy = () => setOpenPrivacy(true);
  const handleClosePrivacy = () => setOpenPrivacy(false);

  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);


  const termsComponents = {
    a: ({ href, children, ...props }) => {
      if (href === '/privacy.md') {

        return (
          <MuiLink
            component="button"
            variant="body2"
            color="secondary"
            {...props}
            onClick={() => {
              handleCloseTerms();
              handleOpenPrivacy();
            }}
          >
            {children}
          </MuiLink>
        );
      }
      return <a href={href} {...props}>{children}</a>;
    }
  };

  return (
    <Box sx={{ backgroundColor: '#1E1E1E', color: '#CCCCCC', py: 3, mt: 4 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} ScavengerHuntWizard. All rights reserved.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <MuiLink
            component="button"
            variant="body2"
            color="secondary"
            sx={{ mx: 1 }}
            onClick={handleOpenPrivacy}
          >
            Privacy Policy
          </MuiLink>
          <MuiLink
            component="button"
            variant="body2"
            color="secondary"
            sx={{ mx: 1 }}
            onClick={handleOpenTerms}
          >
            Terms of Use
          </MuiLink>
        </Box>
      </Container>


      <Dialog
        open={openPrivacy}
        onClose={handleClosePrivacy}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent dividers>
          <ReactMarkdown>
            {privacyContent}
          </ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacy}>Close</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openTerms}
        onClose={handleCloseTerms}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Terms of Use</DialogTitle>
        <DialogContent dividers>
          <ReactMarkdown components={termsComponents}>
            {termsContent}
          </ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Footer;
