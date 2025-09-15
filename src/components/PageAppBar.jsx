import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@mui/material';

import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    Divider,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    ListItemIcon,
    Tooltip
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import {
    Assignment,
    AssignmentAdd,
    Brightness3,
    Brightness7,
    Category,
    Close,
    Domain,
    Language,
    Logout,
    Person,
    Security,
    QuestionMark,
    QuestionAnswer,
} from '@mui/icons-material';

const PageAppBar = ({ toggleColorMode, isDrawerOpen, setIsDrawerOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    const colorMode = localStorage.getItem('colorMode');
    const navigate = useNavigate();

    const languages = [
        { identifier: 'es', name: 'Español' },
        { identifier: 'en', name: 'English' }
    ];

    const currentLanguage = languages.find(lang => lang.identifier === i18n.language)?.name || i18n.language;

    const pages = [
        { name: t('navigation.index'), path: '/', icon: <Domain /> },
        { name: t('navigation.surveys'), path: '/surveys', icon: <AssignmentAdd /> },
        { name: t('navigation.surveyAssignment'), path: '/surveys/assignment', icon: <Assignment /> },
        { name: 'divider' },
        { name: t('navigation.users'), path: '/users', icon: <Person /> },
        { name: t('navigation.roles'), path: '/roles', icon: <Security /> },
    ];

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorLanguageMenu, setAnchorLanguageMenu] = useState(null);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLanguageMenu = (event) => {
        setAnchorLanguageMenu(event.currentTarget);
    };

    const handleCloseLanguageMenu = () => {
        setAnchorLanguageMenu(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'primary.main' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FASTY SURVEY
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={t('navigation.profile')}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem>
                                <Avatar sx={{ mr: 1 }} /> {t('navigation.profile')}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={toggleColorMode}>
                                <ListItemIcon>
                                    {colorMode === 'dark' ? <Brightness3 size="small" /> : <Brightness7 size="small" />}
                                </ListItemIcon>
                                {t('navigation.theme')}: {colorMode === 'dark' ? t('navigation.dark') : t('navigation.white')}
                            </MenuItem>
                            <MenuItem onClick={handleOpenLanguageMenu}>
                                <ListItemIcon>
                                    <Language size="small" />
                                </ListItemIcon>
                                {t('navigation.language')}: {currentLanguage}
                            </MenuItem>
                            <Divider />
                            <MenuItem color="danger">
                                <ListItemIcon>
                                    <Logout color="error" size="small" />
                                </ListItemIcon>
                                <Typography color="error">{t('navigation.logout')}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <ListItemIcon>
                                    <Close size="small" />
                                </ListItemIcon>
                                {t('navigation.close')}
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Menu
                        id="menu-language"
                        anchorEl={anchorLanguageMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={Boolean(anchorLanguageMenu)}
                        onClose={handleCloseLanguageMenu}
                    >
                        {languages.map((language) => (
                            <MenuItem
                                selected={language.identifier === i18n.language}
                                key={language.identifier}
                                onClick={() => {
                                    changeLanguage(language.identifier);
                                    handleCloseLanguageMenu();
                                }}
                            >
                                <Typography textAlign="center">{language.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                variant={isMobile ? 'temporary' : 'persistent'}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(!isDrawerOpen)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Toolbar />
                <Box
                    sx={{ width: 250, overflow: 'auto' }}
                    role="presentation"
                    onClick={() => isMobile && setIsDrawerOpen(false)}
                    onKeyDown={() => isMobile && setIsDrawerOpen(false)}
                >
                    <List>
                        {pages.map((page, index) => (
                            page.name === 'divider' ? (
                                <Divider key={`divider-${index}`} />
                            ) : (
                                <ListItem key={page.name} disablePadding>
                                    <ListItemButton onClick={() => handleNavigate(page.path)}>
                                        <ListItemIcon>{page.icon}</ListItemIcon>
                                        <ListItemText primary={page.name} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default PageAppBar;