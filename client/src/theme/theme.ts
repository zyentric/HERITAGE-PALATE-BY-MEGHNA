// import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1a1a1a',
          },
          secondary: {
            main: '#8c7c61',
          },
          background: {
            default: '#faf9f6',
            paper: '#ffffff',
          },
          text: {
            primary: '#1c1c1c',
            secondary: '#5e5e5e',
          },
        }
      : {
          primary: {
            main: '#f5f5f5',
          },
          secondary: {
            main: '#c2aa84',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#f0f0f0',
            secondary: '#a0a0a0',
          },
        }),
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif' },
    h2: { fontFamily: '"Playfair Display", serif' },
    h3: { fontFamily: '"Playfair Display", serif' },
    h4: { fontFamily: '"Playfair Display", serif' },
    h5: { fontFamily: '"Playfair Display", serif' },
    h6: { fontFamily: '"Playfair Display", serif' },
    button: {
      letterSpacing: '0.1em',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          padding: '12px 24px',
        },
      },
    },
  }
});

export default getDesignTokens;
