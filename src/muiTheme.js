import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5D3FD3', // Brand purple
            light: '#7C5DEA', // A lighter shade of purple for hover/focus states
            dark: '#4E32B9',  // Slightly darker shade for contrast
        },
        secondary: {
            main: '#fab70b', // Gold accent
            light: '#fab70b',
            dark: '#fab70b',
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1E1E1E',   // Slightly lighter for cards/panels
        },
        text: {
            primary: '#FFFFFF', // White text for readability on dark bg
            secondary: '#CCCCCC', // Slightly lighter than #B3B3B3 for better readability
        },
    },
    shape: {
        borderRadius: 12, // Consistent border radius across components
    },
    typography: {
        fontFamily: 'Montserrat, Raleway, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.125rem',
            letterSpacing: '0.5px',
            color: '#fab70b',
            lineHeight: 1.2,
        },
        h4: {
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: '#fab70b',
            lineHeight: 1.3,
        },
        h5: {
            fontWeight: 600,
            color: '#FFFFFF',
            fontSize: '1.5rem',
            lineHeight: 1.3,
        },
        h6: {
            fontWeight: 500,
            color: '#FFFFFF',
            lineHeight: 1.4,
        },
        subtitle1: {
            fontWeight: 400,
            color: '#B3B3B3',
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body1: {
            lineHeight: 1.6,
            color: '#CCCCCC', // Slightly lighter for better contrast
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: '100%', // Ensure html is also covering the full height
                },
                body: {
                    margin: 0,
                    height: '100%',  // Set the height to 100% of the html element
                    minHeight: '100vh', // Minimum height is 100% of the viewport height
                    background: 'linear-gradient(180deg, #5D3FD3 0%, #121212 100%)',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    color: '#FFFFFF',
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#5D3FD3',
                    boxShadow: 'none',
                    padding: '0.5rem 1rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1E1E1E',
                    color: '#FFFFFF',
                    borderRadius: 12, // Use theme's border radius for consistency
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.7)',
                    padding: '2rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginTop: '1rem',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        transition: 'border-color 0.3s ease',
                        '&:hover fieldset': {
                            borderColor: '#7C5DEA',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#5D3FD3',
                        },
                    },
                    '& label.Mui-focused': {
                        color: '#FFD700',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    transition: 'background-color 0.3s ease, box-shadow 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#4E32B9',
                    },
                    '&:active': {
                        boxShadow: '0px 0px 10px #4E32B9',
                    },
                    '&:focus': {
                        outline: 'none',
                        boxShadow: '0px 0px 4px #7C5DEA',
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        color: '#FFE733',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    transition: 'color 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(93,63,211,0.2)',
                        color: '#FFD700',
                    },
                },
            },
        },
    },
});

export default muiTheme;
