import React from 'react';
import Grid from '@mui/material/Grid2';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function HintList({ steps }) {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Scavenger Hunt Hints
      </Typography>
      <Grid container spacing={2}>
        {steps.map((step, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} style={{ padding: '1rem' }}>
              <List>
                {step.clues?.map((clue, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={`Clue ${step.clues.length - i}`}
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
