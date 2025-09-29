import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    Grid,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material';

import PageModal from '../../components/PageModal';
import createRoleSchema from '../../js/validations/roleSchema';

const ModalRoles = ({ idRole = 0, open, onClose }) => {
    const { t } = useTranslation();
    const roleSchema = createRoleSchema(t);

    const initialRoleState = {
        name: "",
        permissions: []
    };

    const [infoRole, setInfoRole] = useState(initialRoleState);
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        const parsed = roleSchema.safeParse(data);
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

    const addRole = async () => {
        const res = validate(infoRole);
        if (!res.ok) return;
        toast.success(t('role.roleCreated'));
        onClose();
    };

    const editRole = async () => {
        const res = validate(infoRole);
        if (!res.ok) return;
        toast.success(t('role.roleEdited'));
        onClose();
    };

    const handleRoleChange = (e) => {
        const { name, value } = e.target;

        setInfoRole((prev) => ({
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

        if (idRole == 0) {
            setInfoRole(initialRoleState);
            setErrors({});
        } else {
            setInfoRole({
                name: "Administrator",
                permissions: ["1", "2"]
            });
            setErrors({});
        }
    }, [open, idRole]);

    return (
        <PageModal
            maxWidth="sm"
            open={open}
            onClose={onClose}
            title={idRole != 0 ? t('role.editRole') : t('role.addRole')}
            onConfirm={idRole != 0 ? editRole : addRole}
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
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <FormControl fullWidth error={Boolean(errors.name)}>
                        <TextField
                            id="name"
                            name="name"
                            label={t('user.name')}
                            variant="outlined"
                            value={infoRole.name}
                            onChange={handleRoleChange}
                            error={Boolean(errors.name)}
                        />

                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.names || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <FormControl fullWidth error={Boolean(errors.permissions)}>
                        <InputLabel id="permissionsLabel">{t('role.selectMultiplePermissions')}</InputLabel>
                        <Select
                            labelId="permissionsLabel"
                            id="permissions"
                            name="permissions"
                            value={infoRole.permissions || ""}
                            onChange={handleRoleChange}
                            input={<OutlinedInput label={t('role.selectMultiplePermissions')} />}
                            multiple
                        >
                            <MenuItem value={"1"}>Manage Users</MenuItem>
                            <MenuItem value={"2"}>Manage Roles</MenuItem>
                        </Select>
                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errors.permissions || " "}
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </PageModal>
    );
}

export default ModalRoles;