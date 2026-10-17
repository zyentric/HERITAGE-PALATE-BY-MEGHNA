import type { ThemeOptions, Theme } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1A1815', // Rich Espresso Onyx
            light: '#2E2A26',
            dark: '#0B0A09',
            contrastText: '#FAF8F5',
          },
          secondary: {
            main: '#9C7A4A', // Royal Champagne Gold / Brass
            light: '#B89665',
            dark: '#735730',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#FAF8F5', // Warm Ivory Alabaster
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1A1815',
            secondary: '#6E665E',
          },
          divider: 'rgba(26, 24, 21, 0.08)',
          action: {
            hover: 'rgba(156, 122, 74, 0.06)',
            selected: 'rgba(156, 122, 74, 0.12)',
          },
        }
      : {
          primary: {
            main: '#D4AF37', // Imperial Heritage Gold
            light: '#E6C766',
            dark: '#A6841E',
            contrastText: '#0E0D0C',
          },
          secondary: {
            main: '#C5A880', // Soft Champagne
            light: '#DCC4A4',
            dark: '#937854',
            contrastText: '#0E0D0C',
          },
          background: {
            default: '#0F0E0D', // Deep Warm Obsidian
            paper: '#181715',
          },
          text: {
            primary: '#F7F4EE',
            secondary: '#AAA399',
          },
          divider: 'rgba(247, 244, 238, 0.08)',
          action: {
            hover: 'rgba(212, 175, 55, 0.08)',
            selected: 'rgba(212, 175, 55, 0.16)',
          },
        }),
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    subtitle1: {
      letterSpacing: '0.03em',
      lineHeight: 1.6,
    },
    subtitle2: {
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    overline: {
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '0.75rem',
    },
    button: {
      letterSpacing: '0.12em',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 0,
          textTransform: 'uppercase',
          padding: '12px 28px',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&.MuiButton-containedPrimary': {
            backgroundColor: theme.palette.mode === 'light' ? '#1A1815' : '#D4AF37',
            color: theme.palette.mode === 'light' ? '#FAF8F5' : '#0F0E0D',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'light' ? '#9C7A4A' : '#E6C766',
              color: '#FFFFFF',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: theme.palette.mode === 'light' ? '#1A1815' : '#D4AF37',
            color: theme.palette.mode === 'light' ? '#1A1815' : '#D4AF37',
            '&:hover': {
              borderColor: theme.palette.secondary.main,
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(156, 122, 74, 0.06)' : 'rgba(212, 175, 55, 0.1)',
              color: theme.palette.secondary.main,
            },
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          display: 'none !important',
          width: '0 !important',
          height: '0 !important',
        },
        '*': {
          scrollbarWidth: 'none !important',
          msOverflowStyle: 'none !important',
        },
        'html, body': {
          scrollbarWidth: 'none !important',
          msOverflowStyle: 'none !important',
        },
      },
    },
  },
});

export default getDesignTokens;
