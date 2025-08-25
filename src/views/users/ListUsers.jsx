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

import ActionButtons from '../../components/ActionButtons';
import PageTable from '../../components/PageTable';

const ListUsers = () => {
    const { t } = useTranslation();

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
                            >
                                {t('add')}
                            </Button>
                        </Box>

                        <PageTable
                            headCells={userHeaders}
                            rows={userList}
                            actions={
                                <ActionButtons
                                    showView
                                    showEdit
                                    showDelete
                                />
                            }
                        />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default ListUsers;