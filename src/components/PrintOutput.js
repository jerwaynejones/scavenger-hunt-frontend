import React, { useRef } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useReactToPrint } from 'react-to-print';


function PrintOutput({ hunt , onBack }) {
    const contentRef = useRef(null);

    const handlePrint = useReactToPrint({ contentRef });

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <style>
                {`
          @page {
            size: letter portrait;
            margin: 0.5in;
          }

          @media print {
            body {
              margin: 0;
              padding: 0;
            }

            .clue-grid {
              display: grid;
              grid-template-columns: repeat(2, 3.6in);
              grid-template-rows: repeat(5, 2in);
              gap: 0.1in;
            }

            .clue-card {
              border: 1px dashed #000;
              position: relative;
              padding: 0.25in;
              box-sizing: border-box;
              background: #fff;
              border-style: dashed 
            }

            .clue-text {
              font-size: 1rem;
              line-height: 1.2;
              white-space: pre-line;
              color: #000; 
            }

            .clue-location {
              position: absolute;
              bottom: 0.1in;
              right: 0.1in;
              font-size: 0.7rem;
              color: #D3D3D3;
            }
          }
        `}
            </style>

            <div ref={contentRef}>
                <Typography variant="h4" gutterBottom align="center">
                    Your Results
                </Typography>

                <div className="clue-grid">
                    {hunt.steps.map((step, index) => (
                        <div className="clue-card" key={index}>
                            <div className="clue-text"> {step.clue.replace(/\r?\n|\r/g, '')}</div>
                            {step.location && <div className="clue-location">{step.location}</div>}
                        </div>
                    ))}
                </div>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Final Gift Location: {hunt.finalGiftLocation}
                </Typography>
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePrint()}
                fullWidth
                sx={{ mt: 2 }}
            >
                Print or Save as PDF
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onBack}
                fullWidth
                sx={{ mt: 2 }}
            >
                Go Back to Add More Clues
            </Button>
        </Container>
    );
}

export default PrintOutput;