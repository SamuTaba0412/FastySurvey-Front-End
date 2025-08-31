import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

import { Add } from '@mui/icons-material';

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
            label: t('fullName'),
            disableSorting: false
        },
        {
            id: "identificationType",
            numeric: false,
            disablePadding: false,
            label: t('identificationType'),
            disableSorting: false
        },
        {
            id: "identification",
            numeric: false,
            disablePadding: false,
            label: t('identification'),
            disableSorting: false
        },
        {
            id: "email",
            numeric: false,
            disablePadding: false,
            label: t('email'),
            disableSorting: false
        },
        {
            id: "role",
            numeric: false,
            disablePadding: false,
            label: t('role'),
            disableSorting: false
        }
    ], [t]);

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {t('users')}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                color="success"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => {
                                    setIdUsuario(0);
                                    setOpenUserModal(true);
                                }}
                            >
                                {t('add')}
                            </Button>
                        </Box>

                        <PageTable
                            headCells={userHeaders}
                            rows={userList}
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