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
            secondary: {
                main: '#9C27B0',
                light: '#d05ce3',
                dark: '#6a0080',
                contrastText: '#fff',
            },
            success: {
                main: '#2E7D32',
                light: '#60ad5e',
                dark: '#005005',
                contrastText: '#fff',
            },
            background:
                mode === 'dark'
                    ? { default: '#121212', paper: '#1d1d1d' }
                    : { default: '#f5f5f5', paper: '#fff' },
        },
        typography: {
            fontFamily: '"Inter", sans-serif',
        },
    });
