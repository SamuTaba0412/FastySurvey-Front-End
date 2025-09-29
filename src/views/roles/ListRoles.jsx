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

import ModalRoles from './ModalRoles';
import DeleteRoles from './DeleteRoles';
import InfoRoles from './InfoRoles';

const ListRoles = () => {
    const { t } = useTranslation();

    const [openRoleModal, setOpenRoleModal] = useState(false);
    const [openDeleteRoleModal, setOpenDeleteRoleModal] = useState(false);
    const [openInfoRoleModal, setOpenInfoRoleModal] = useState(false);

    const [idRole, setIdRole] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [roleList, setRoleList] = useState([
        {
            idRole: 1,
            name: "Administrator",
            permissions: [{
                idPermission: 1,
                namePermission: "Manage Users",
            },
            {
                idPermission: 2,
                namePermission: "Manage Roles",
            }],
            state: 1
        },
        {
            name: "Survey Creator",
            permissions: [{
                idPermission: 1,
                namePermission: "Manage Users",
            }],
            state: 1
        },
    ]);

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



    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {t('navigation.roles')}
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
                                    setIdRole(0);
                                    setOpenRoleModal(true);
                                }}
                                sx={{ ml: 'auto' }}
                            >
                                {t('user.add')}
                            </Button>
                        </Box>

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
                            )}
                        />
                    </Box>
                </CardContent>
            </Card>

            <ModalRoles
                open={openRoleModal}
                onClose={() => setOpenRoleModal(false)}
                idRole={idRole}
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