import { createTheme } from '@mui/material/styles';

 const theme =  {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#080808',
      paper: '#060606',
    },
    text: {
      primary: 'rgba(243,238,238,0.87)',
      secondary: 'rgba(249,245,245,0.6)',
      disabled: 'rgba(243,238,238,0.38)',
    },
  },
};

export const themeOptions = createTheme(theme);