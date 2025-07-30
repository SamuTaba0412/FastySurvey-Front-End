import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#1976D2',
                light: '#63a4ff',
                dark: '#004ba0',
                contrastText: '#fff',
            },
            background: mode === 'dark'
                ? { default: '#121212', paper: '#1d1d1d' }
                : { default: '#f5f5f5', paper: '#fff' },
        },
        typography: {
            fontFamily: '"Inter", sans-serif',
        }
    });
