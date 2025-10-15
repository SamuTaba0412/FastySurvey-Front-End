import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, Box, Toolbar, useMediaQuery } from '@mui/material';

import App from './App.jsx';
import PageAppBar from './components/PageAppBar.jsx';

import { getTheme } from './js/theme.js';
import { ToastContainer } from 'react-toastify';
import { LoaderProvider } from './context/LoaderContext.jsx'

import './js/i18next.js';
import './css/index.css';
import './css/loader.css';

const Root = () => {
  const storedMode = localStorage.getItem('colorMode') || 'light';

  const [mode, setMode] = useState(storedMode);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
  };

  return (
    <LoaderProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer theme={storedMode == 'light' ? 'colored' : 'dark'} />
        <BrowserRouter>
          <PageAppBar
            toggleColorMode={toggleColorMode}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
          <Toolbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: isDrawerOpen && !isMobile ? '240px' : 0,
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Container>
              <App />
            </Container>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </LoaderProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
