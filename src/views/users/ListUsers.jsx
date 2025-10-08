import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';
import { getData, putData } from '../../utils/api/fetchMetods';
import { toast } from 'react-toastify';

import {
    Box,
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    Typography,
    Skeleton,
    Switch
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

const RUTA_API = import.meta.env.VITE_API_URL;

const ListUsers = () => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();

    const [openUserModal, setOpenUserModal] = useState(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
    const [openInfoUserModal, setOpenInfoUserModal] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const [idUser, setIdUser] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [userList, setUserList] = useState([]);
    const [rolesList, setRolesList] = useState([]);

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
            id: "role",
            numeric: false,
            disablePadding: false,
            label: t('user.role'),
            disableSorting: false
        },
        {
            id: "state",
            numeric: false,
            disablePadding: false,
            label: t('tables.state'),
            disableSorting: true
        }
    ], [t]);

    const filteredUsers = useMemo(() => {
        const keyword = searchTerm.toLowerCase();

        return userList
            .filter(user =>
                user.fullName.toLowerCase().includes(keyword) ||
                user.identificationType.toLowerCase().includes(keyword) ||
                user.identification.toLowerCase().includes(keyword) ||
                user.role.roleName.toLowerCase().includes(keyword)
            )
            .map(user => ({
                ...user,
                role: user.role.roleName,
                state: (
                    <Switch
                        checked={user.state === 1}
                        onChange={() => handleToggleState(user.idUser)}
                        color="success"
                    />
                ),
            }));
    }, [searchTerm, userList]);

    const handleToggleState = async (idUser) => {
        startLoading();

        try {
            const { status, dataResponse } = await putData(`${RUTA_API}/users/state/${idUser}`)

            if (status >= 200 && status < 300) {
                setUserList(prev =>
                    prev.map(user =>
                        user.idUser === idUser ? { ...user, state: dataResponse } : user
                    )
                );

                toast.success(
                    dataResponse === 1
                        ? t('user.userActivated')
                        : t('user.userDeactivated')
                );
            } else if (status >= 400 && status < 500) {
                toast.warning(`${status}: ${dataResponse.detail}`)
            }
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            stopLoading();
        }
    };

    useEffect(() => {
        startLoading();
        setLoadingUsers(true);

        const loadData = async () => {
            try 
            {
                const [userRes, rolesRes] = await Promise.all([
                    getData(`${RUTA_API}/users`),
                    getData(`${RUTA_API}/roles`)
                ]);

                if (userRes.status >= 200 && userRes.status < 300) {
                    const mappedUsers = userRes.dataResponse.map(user => ({
                        idUser: user.id_user,
                        fullName: `${user.names} ${user.last_names}`,
                        identificationType: user.identification_type,
                        identification: user.identification,
                        state: user.user_state,
                        role: {
                            idRole: user.role.id_role,
                            roleName: user.role.role_name
                        }
                    }));

                    setUserList(mappedUsers);
                }

                if (rolesRes.status >= 200 && rolesRes.status < 300) {
                    const mappedRoles = rolesRes.dataResponse.map(role => ({
                        idRole: role.id_role,
                        name: role.role_name,
                        state: role.role_state,
                        permissions: role.permissions.map(p => ({
                            idPermission: p.id_permission,
                            namePermission: p.permission_name,
                        }))
                    }));

                    setRolesList(mappedRoles);
                }
            }
            catch (err) {
                toast.error(err);
            }
            finally {
                stopLoading();
                setLoadingUsers(false);
            }
        }

        loadData();
    }, []);

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    {!loadingUsers ? (
                        <Typography variant="h4" gutterBottom>
                            {t('navigation.users')}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                    )}
                    <Box sx={{ mt: 2 }}>
                        {!loadingUsers ? (
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
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Skeleton variant="rectangular" width="60%" height={40} />
                                <Skeleton variant="rectangular" width="40%" height={40} />
                            </Box>
                        )}

                        {!loadingUsers ? (
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
                        ) : (
                            <Box>
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        variant="rectangular"
                                        height={50}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <InfoUsers
                open={openInfoUserModal}
                onClose={() => setOpenInfoUserModal(false)}
                idUser={idUser}
                userList={userList}
                setUserList={setUserList}
            />

            <ModalUsers
                open={openUserModal}
                onClose={() => setOpenUserModal(false)}
                idUser={idUser}
                userList={userList}
                setUserList={setUserList}
                rolesList={rolesList}
            />

            <DeleteUsers
                open={openDeleteUserModal}
                onClose={() => setOpenDeleteUserModal(false)}
                idUser={idUser}
                setUserList={setUserList}
            />
        </>
    );
}

export default ListUsers;
