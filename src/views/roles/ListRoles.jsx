import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';
import { getData } from '../../utils/api/fetchMetods';
import { toast } from 'react-toastify';

import {
    Box,
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    Typography,
    Skeleton
} from '@mui/material';

import {
    Add,
    Search,
} from '@mui/icons-material';

import PageActionButtons from '../../components/PageActionButtons';
import PageTable from '../../components/PageTable';

import ModalRoles from './ModalRoles';
import DeleteRoles from './DeleteRoles';
import InfoRoles from './InfoRoles';

const RUTA_API = import.meta.env.VITE_API_URL;

const ListRoles = () => {
    const { t } = useTranslation();
    const { loading, setLoading } = useLoader();

    const [openRoleModal, setOpenRoleModal] = useState(false);
    const [openDeleteRoleModal, setOpenDeleteRoleModal] = useState(false);
    const [openInfoRoleModal, setOpenInfoRoleModal] = useState(false);

    const [idRole, setIdRole] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [roleList, setRoleList] = useState([]);

    const roleHeaders = useMemo(() => [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: t('user.name'),
            disableSorting: false
        },
        {
            id: "permissions",
            numeric: false,
            disablePadding: false,
            label: t('tables.permissions'),
            disableSorting: true
        },
        {
            id: "state",
            numeric: false,
            disablePadding: false,
            label: t('tables.state'),
            disableSorting: true
        }
    ], [t]);

    const filteredRoles = useMemo(() => {
        const keyword = searchTerm.toLowerCase();

        return roleList
            .filter(role =>
                role.name.toLowerCase().includes(keyword) ||
                role.permissions.some(p => p.namePermission.toLowerCase().includes(keyword))
            )
            .map(role => ({
                ...role,
                permissions: role.permissions.map(p => p.namePermission).join(', '),
            }));
    }, [searchTerm, roleList]);

    useEffect(() => {
        setLoading(true);

        const loadData = async () => {
            try {
                const { status, dataResponse } = await getData(`${RUTA_API}/roles`);

                if (status >= 200 && status < 300) {
                    const mappedRoles = dataResponse.map(role => ({
                        idRole: role.id_role,
                        name: role.role_name,
                        state: role.role_state,
                        permissions: role.permissions.map(p => ({
                            idPermission: p.id_permission,
                            namePermission: p.permission_name,
                        }))
                    }))

                    setRoleList(mappedRoles);
                }
            }
            catch (err) {
                toast.error(t('navigation.resourcesNotFound'));
            }
            finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    {!loading ? (
                        <Typography variant="h4" gutterBottom>
                            {t('navigation.roles')}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                    )}

                    <Box sx={{ mt: 1 }}>
                        {!loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
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
                                    sx={{ width: { xs: '60%', sm: '250px' } }}
                                />
                                <Button
                                    color="success"
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => {
                                        setIdRole(0);
                                        setOpenRoleModal(true);
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

                        {!loading ? (
                            <PageTable
                                headCells={roleHeaders}
                                rows={filteredRoles}
                                actions={(row) => (
                                    <PageActionButtons
                                        showView
                                        showEdit
                                        showDelete
                                        onView={() => {
                                            setIdRole(row.idRole);
                                            setOpenInfoRoleModal(true);
                                        }}
                                        onEdit={() => {
                                            setIdRole(row.idRole);
                                            setOpenRoleModal(true);
                                        }}
                                        onDelete={() => {
                                            setIdRole(row.idRole);
                                            setOpenDeleteRoleModal(true);
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

            <ModalRoles
                open={openRoleModal}
                onClose={() => setOpenRoleModal(false)}
                idRole={idRole}
                roleList={roleList}
                setRoleList={setRoleList}
            />
            <DeleteRoles
                open={openDeleteRoleModal}
                onClose={() => setOpenDeleteRoleModal(false)}
                idRole={idRole}
            />
            <InfoRoles
                open={openInfoRoleModal}
                onClose={() => setOpenInfoRoleModal(false)}
                idRole={idRole}
            />
        </>
    );
}

export default ListRoles;