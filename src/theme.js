import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',  // Rich blue color
      light: '#42A5F5',
      dark: '#1565C0',
    },
    secondary: {
      main: '#2E7D32',  // Green color for accents like buttons
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(25, 118, 210, 0.95)',  // Semi-transparent blue
          backdropFilter: 'blur(8px)',  // Glass effect
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        containedPrimary: {
          color: 'white',
        },
      },
    },
  },
});

export default theme; 