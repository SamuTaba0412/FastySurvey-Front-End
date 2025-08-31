import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    Grid,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

import PageModal from '../../components/PageModal';
import createUserSchema from '../../js/validations/userSchema';

const ModalUsers = ({ idUser = 0, open, onClose }) => {
    const { t } = useTranslation();
    const userSchema = createUserSchema(t);

    const initialUserState = {
        names: "",
        lastNames: "",
        identificationType: "",
        identification: "",
        email: "",
        role: ""
    };

    const [infoUser, setInfoUser] = useState(initialUserState);
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        const parsed = userSchema.safeParse(data);
        if (parsed.success) {
            setErrors({});
            return { ok: true, data: parsed.data };
        }

        const fieldErrors = {};
        parsed.error.issues.forEach((issue) => {
            const path = issue.path.join(".") || "form";
            if (!fieldErrors[path]) fieldErrors[path] = issue.message;
        });

        setErrors(fieldErrors);
        return { ok: false, errors: fieldErrors };
    };

    const addUser = async () => {
        const res = validate(infoUser);
        if (!res.ok) return;
        toast.success(t('user.userCreated'));
        onClose();
    };

    const editUser = async () => {
        const res = validate(infoUser);
        if (!res.ok) return;
        toast.success(t('user.userEdited'));
        onClose();
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;

        setInfoUser((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErr = { ...prev };
                delete newErr[name];
                return newErr;
            });
        }
    };

    useEffect(() => {
        if (!open) return;

        if (idUser == 0) {
            setInfoUser(initialUserState);
            setErrors({});
        } else {
            setInfoUser({
                names: "Samuel",
                lastNames: "Tabares Patiño",
                identificationType: "1",
                identification: "1017923676",
                email: "samutabares09022005@gmail.com",
                role: "1"
            });
            setErrors({});
        }
    }, [open, idUser]);

    return (
        <PageModal
            maxWidth="md"
            open={open}
            onClose={onClose}
            title={idUser != 0 ? t('user.editUser') : t('user.addUser')}
            onConfirm={idUser != 0 ? editUser : addUser}
            sx={{
                "& .MuiDialog-container": {
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                },
            }}
            confirmText={t('actions.save')}
            cancelText={t('actions.cancel')}
            showActions
        >
            <Grid container spacing={2} alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                    <FormControl fullWidth error={Boolean(errors.names)}>
                        <TextField
                            id="names"
                            name="names"
                            label={t('user.names')}
                            variant="outlined"
                            value={infoUser.names}
                            onChange={handleUserChange}
                            error={Boolean(errors.names)}
                        />

                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.names || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                    <FormControl fullWidth error={Boolean(errors.lastNames)}>
                        <TextField
                            id="lastNames"
                            name="lastNames"
                            label={t('user.lastNames')}
                            variant="outlined"
                            value={infoUser.lastNames}
                            onChange={handleUserChange}
                            error={Boolean(errors.lastNames)}
                        />

                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.lastNames || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                    <FormControl fullWidth error={Boolean(errors.identificationType)}>
                        <InputLabel id="identificationTypeLabel">{t('user.identificationType')}</InputLabel>
                        <Select
                            labelId="identificationTypeLabel"
                            id="identificationType"
                            name="identificationType"
                            value={infoUser.identificationType || ""}
                            onChange={handleUserChange}
                        >
                            <MenuItem value={"1"}>{t('C.C.')}</MenuItem>
                            <MenuItem value={"2"}>{t('C.E.')}</MenuItem>
                        </Select>
                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.identificationType || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                    <FormControl fullWidth error={Boolean(errors.identification)}>
                        <TextField
                            id="identification"
                            name="identification"
                            label={t('user.identification')}
                            variant="outlined"
                            value={infoUser.identification}
                            onChange={handleUserChange}
                            error={Boolean(errors.identification)}
                        />

                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.identification || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                        <TextField
                            id="email"
                            name="email"
                            label={t('user.email')}
                            variant="outlined"
                            type="email"
                            value={infoUser.email}
                            onChange={handleUserChange}
                            error={Boolean(errors.email)}
                        />

                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.email || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 12, md: 6 }}>
                    <FormControl fullWidth error={Boolean(errors.role)}>
                        <InputLabel id="roleLabel">{t('user.role')}</InputLabel>
                        <Select
                            labelId="roleLabel"
                            id="role"
                            name="role"
                            value={infoUser.role || ""}
                            onChange={handleUserChange}
                        >
                            <MenuItem value={"1"}>Administrador</MenuItem>
                        </Select>
                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.role || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </PageModal>
    );
};

export default ModalUsers;
