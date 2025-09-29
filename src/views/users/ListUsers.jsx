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

    const [idUser, setIdUser] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [userList, setUserList] = useState([
        {
            idUser: 1,
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
            user.fullName.toLowerCase().includes(keyword) ||
            user.identificationType.toLowerCase().includes(keyword) ||
            user.identification.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword) ||
            user.role.toLowerCase().includes(keyword)
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
                                    setIdUser(0);
                                    setOpenUserModal(true);
                                }}
                                sx={{ ml: 'auto' }}
                            >
                                {t('user.add')}
                            </Button>
                        </Box>

                        <PageTable
                            headCells={userHeaders}
                            rows={filteredUsers}
                            actions={(row) => (
                                <PageActionButtons
                                    showView
                                    showEdit
                                    showDelete
                                    onView={() => {
                                        setIdUser(row.idUser);
                                        setOpenInfoUserModal(true);
                                    }}
                                    onEdit={() => {
                                        setIdUser(row.idUser);
                                        setOpenUserModal(true);
                                    }}
                                    onDelete={() => {
                                        setIdUser(row.idUser);
                                        setOpenDeleteUserModal(true);
                                    }}
                                />
                            )}
                        />
                    </Box>
                </CardContent>
            </Card>

            <InfoUsers
                open={openInfoUserModal}
                onClose={() => setOpenInfoUserModal(false)}
                idUser={idUser}
            />

            <ModalUsers
                open={openUserModal}
                onClose={() => setOpenUserModal(false)}
                idUser={idUser}
            />

            <DeleteUsers
                open={openDeleteUserModal}
                onClose={() => setOpenDeleteUserModal(false)}
                idUser={idUser}
            />
        </>
    );
}

export default ListUsers;
