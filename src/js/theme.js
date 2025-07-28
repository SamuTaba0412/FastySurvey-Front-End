// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'dark'
                ? {
                    background: { default: '#121212', paper: '#1d1d1d' },
                }
                : {
                    background: { default: '#f5f5f5', paper: '#fff' },
                }),
        },
        typography: {
            fontFamily: '"Inter", sans-serif',
        }
    });
