import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

import PageModal from '../../components/PageModal';

const ModalUsers = ({ idUsuario = 0, open, onClose }) => {
    const { t } = useTranslation();

    const initialUserState = {
        names: "",
        lastNames: "",
        identificationType: "",
        identification: "",
        email: "",
        role: ""
    };

    const [infoUser, setInfoUser] = useState(initialUserState);

    const addUser = async () => {
        toast.success(t('userCreated'));
        onClose();
    };

    const editUser = async () => {
        toast.success(t('userEdited'));
        onClose();
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setInfoUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (!open) return;

        if (idUsuario == 0) setInfoUser(initialUserState);
        else {
            setInfoUser({
                names: "Samuel",
                lastNames: "Tabares Patiño",
                identificationType: 1,
                identification: "1017923676",
                email: "samutabares09022005@gmail.com",
                role: 1
            });
        }
    }, [open, idUsuario]);

    return (
        <>
            <PageModal
                maxWidth="md"
                open={open}
                onClose={onClose}
                title={idUsuario != 0 ? t('editUser') : t('addUser')}
                onConfirm={idUsuario != 0 ? editUser : addUser}
                sx={{
                    "& .MuiDialog-container": {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-center",
                    },
                }}
                confirmText={t('save')}
                cancelText={t('cancel')}
                showActions
            >
                <Grid container spacing={2} alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                        <TextField
                            id="names"
                            name="names"
                            label={t('names')}
                            variant="outlined"
                            value={infoUser.names}
                            onChange={handleUserChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                        <TextField
                            id="lastNames"
                            name="lastNames"
                            label={t('lastNames')}
                            variant="outlined"
                            value={infoUser.lastNames}
                            onChange={handleUserChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel id="identificationTypeLabel">{t('identificationType')}</InputLabel>
                            <Select
                                labelId="identificationTypeLabel"
                                id="identificationType"
                                name="identificationType"
                                label={t('identificationType')}
                                variant="outlined"
                                value={infoUser.identificationType}
                                onChange={handleUserChange}
                            >
                                <MenuItem value={1}>Cedula De Ciudadania</MenuItem>
                                <MenuItem value={2}>Cedula de Extranjeria</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                        <TextField
                            id="identification"
                            name="identification"
                            label={t('identification')}
                            variant="outlined"
                            value={infoUser.identification}
                            onChange={handleUserChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                        <TextField
                            id="email"
                            name="email"
                            label={t('email')}
                            variant="outlined"
                            type="email"
                            value={infoUser.email}
                            onChange={handleUserChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel id="roleLabel">{t('role')}</InputLabel>
                            <Select
                                labelId="roleLabel"
                                id="role"
                                name="role"
                                label={t('role')}
                                variant="outlined"
                                value={infoUser.role}
                                onChange={handleUserChange}
                            >
                                <MenuItem value={1}>Administrador</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </PageModal>
        </>
    );
}

export default ModalUsers;