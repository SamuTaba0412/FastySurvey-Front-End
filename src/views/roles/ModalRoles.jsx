import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';
import { getData, postData, putData } from '../../utils/api/fetchMetods';
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

const RUTA_API = import.meta.env.VITE_API_URL;

const ModalRoles = ({ idRole = 0, open, onClose, roleList, setRoleList }) => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();
    const roleSchema = createRoleSchema(t);

    const initialRoleState = {
        name: "",
        permissions: []
    };

    const permissions = [
        { "idPermission": "1", "namePermission": t('navigation.index') },
        { "idPermission": "2", "namePermission": t('navigation.surveys') },
        { "idPermission": "3", "namePermission": t('navigation.surveyAssignment') },
        { "idPermission": "4", "namePermission": t('navigation.users') },
        { "idPermission": "5", "namePermission": t('navigation.roles') }
    ];

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

        startLoading();

        try {
            const { status, dataResponse } = await postData(
                `${RUTA_API}/roles`,
                {
                    role_name: infoRole.name,
                    creation_date: new Date().toISOString().split("T")[0],
                    role_state: 1,
                    permissions: infoRole.permissions.map(p => Number(p))
                }
            );

            if (status >= 200 && status < 300) {
                const mappedRole = {
                    idRole: dataResponse.id_role,
                    name: dataResponse.role_name,
                    state: dataResponse.role_state,
                    permissions: dataResponse.permissions.map(p => ({
                        idPermission: p.id_permission,
                        namePermission: p.permission_name,
                    })),
                };

                setRoleList([
                    ...roleList,
                    mappedRole
                ]);

                toast.success(t('role.roleCreated'));
                onClose();
            }
            else if (status >= 400 && status < 500) {
                toast.warning(`${status}: ${dataResponse.detail}`)
            }
        }
        catch (err) {
            toast.error(t('navigation.sendError'));
        }
        finally {
            stopLoading();
        }
    };

    const editRole = async () => {
        const res = validate(infoRole);
        if (!res.ok) return;

        try {
            const { status, dataResponse } = await putData(
                `${RUTA_API}/roles/${idRole}`,
                {
                    role_name: infoRole.name,
                    creation_date: infoRole.creationDate,
                    role_state: infoRole.state,
                    update_date: new Date().toISOString().split("T")[0],
                    permissions: infoRole.permissions.map(p => Number(p))
                }
            );

            if (status >= 200 && status < 300) {
                const mappedRole = {
                    idRole: dataResponse.id_role,
                    name: dataResponse.role_name,
                    state: dataResponse.role_state,
                    permissions: dataResponse.permissions.map(p => ({
                        idPermission: p.id_permission,
                        namePermission: p.permission_name,
                    })),
                };

                setRoleList(prev =>
                    prev.map(role =>
                        role.idRole === mappedRole.idRole ? mappedRole : role
                    )
                );

                toast.success(t('role.roleEdited'));
                onClose();
            }
            else if (status >= 400 && status < 500) {
                toast.warning(`${status}: ${dataResponse.detail}`)
            }
        }
        catch (err) {
            toast.error(t('navigation.sendError'));
        }
        finally {
            stopLoading();
        }
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
            startLoading();

            const loadData = async () => {
                try {
                    const { status, dataResponse } = await getData(`${RUTA_API}/roles/${idRole}`);

                    if (status >= 200 && status < 300) {
                        const mappedRole = {
                            name: dataResponse.role_name,
                            permissions: dataResponse.permissions.map(p => String(p.id_permission)),
                            creationDate: dataResponse.creation_date,
                            updatedDate: dataResponse.update_date,
                            state: dataResponse.role_state
                        };

                        console.log(mappedRole);

                        setInfoRole(mappedRole);
                        setErrors({});
                    }
                }
                catch (err) {
                    toast.error(t('navigation.resourcesNotFound'));
                }
                finally {
                    stopLoading();
                }
            }

            loadData();
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
                            {permissions.map(permission => (
                                <MenuItem
                                    key={permission.idPermission}
                                    value={permission.idPermission}
                                >
                                    {permission.namePermission}
                                </MenuItem>
                            ))}
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