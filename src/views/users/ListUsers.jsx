import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Box,
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

import {
    Add,
    Search,
} from '@mui/icons-material';

import PageActionButtons from '../../components/PageActionButtons';
import PageTable from '../../components/PageTable';

import ModalUsers from './ModalUsers';
import DeleteUsers from './DeleteUsers';
import InfoUsers from './InfoUsers';

const ListUsers = () => {
    const { t } = useTranslation();

    const [openUserModal, setOpenUserModal] = useState(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
    const [openInfoUserModal, setOpenInfoUserModal] = useState(false);

    const [idUsuario, setIdUsuario] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [userList, setUserList] = useState([
        {
            fullName: "Samuel Tabares Patiño",
            identificationType: "C.C.",
            identification: "1017923676",
            email: "samutabares09022005@gmail.com",
            role: "Administrator"
        }
    ]);

    const userHeaders = useMemo(() => [
        {
            id: "fullName",
            numeric: false,
            disablePadding: false,
            label: t('user.fullName'),
            disableSorting: false
        },
        {
            id: "identificationType",
            numeric: false,
            disablePadding: false,
            label: t('user.identificationType'),
            disableSorting: false
        },
        {
            id: "identification",
            numeric: false,
            disablePadding: false,
            label: t('user.identification'),
            disableSorting: false
        },
        {
            id: "email",
            numeric: false,
            disablePadding: false,
            label: t('user.email'),
            disableSorting: false
        },
        {
            id: "role",
            numeric: false,
            disablePadding: false,
            label: t('user.role'),
            disableSorting: false
        }
    ], [t]);

    const filteredUsers = useMemo(() => {
        const keyword = searchTerm.toLowerCase();

        return userList.filter(user =>
            Object.values(user).some(value =>
                value.toLowerCase().includes(keyword)
            )
        );
    }, [searchTerm, userList]);

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {t('navigation.users')}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder={t('navigation.search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={{
                                    width: { xs: '60%', sm: '250px' },
                                }}
                            />

                            <Button
                                color="success"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => {
                                    setIdUsuario(0);
                                    setOpenUserModal(true);
                                }}
                                sx={{ ml: 'auto' }}
                            >
                                {t('user.add')}
                            </Button>
                        </Box>

                        <PageTable
                            headCells={userHeaders}
                            rows={filteredUsers}   // 👈 aquí
                            actions={
                                <PageActionButtons
                                    showView
                                    showEdit
                                    showDelete
                                    onView={(id = 1) => {
                                        setIdUsuario(id);
                                        setOpenInfoUserModal(true);
                                    }}
                                    onEdit={(id = 1) => {
                                        setIdUsuario(id);
                                        setOpenUserModal(true);
                                    }}
                                    onDelete={(id = 1) => {
                                        setIdUsuario(id);
                                        setOpenDeleteUserModal(true);
                                    }}
                                />
                            }
                        />
                    </Box>
                </CardContent>
            </Card>

            <InfoUsers
                open={openInfoUserModal}
                onClose={() => setOpenInfoUserModal(false)}
                idUsuario={idUsuario}
            />

            <ModalUsers
                open={openUserModal}
                onClose={() => setOpenUserModal(false)}
                idUsuario={idUsuario}
            />

            <DeleteUsers
                open={openDeleteUserModal}
                onClose={() => setOpenDeleteUserModal(false)}
                idUsuario={idUsuario}
            />
        </>
    );
}

export default ListUsers;
