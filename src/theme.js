import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'light',
  },
  spacing: 8,
  typography: {
    fontFamily: 'Lato, Arial, sans-serif',
    body: {
      fontSize: 18,
      lineHeight: '24px',
      letterSpacing: 0.6,
    },
  },
});
