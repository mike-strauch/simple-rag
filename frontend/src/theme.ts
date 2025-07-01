'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiTextField: { // Target the Button component
      styleOverrides: {
        root: {
          borderRadius: '4px',
          borderColor: '#919191',
          backgroundColor: '#222222'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#919191', // default border
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#919191', // hover border
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#919191', // focus border
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          padding: '4px'
        }
      }
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#f3f3f3',
    },
    secondary: {
      main: '#f3f3f3',
    },
    text: {
      primary: '#f3f3f3',
      secondary: '#f3f3f3',
    }

  }
});

export default theme;