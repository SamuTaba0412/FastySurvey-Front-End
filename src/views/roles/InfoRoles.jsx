import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';
import { getData } from '../../utils/api/fetchMetods';
import { toast } from 'react-toastify';

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Skeleton,
} from '@mui/material';

import {
    Add,
    Badge,
    CalendarMonth,
    Checklist,
    Edit,
    ToggleOn,
    ToggleOff,
} from '@mui/icons-material';

import PageModal from '../../components/PageModal';

const RUTA_API = import.meta.env.VITE_API_URL;

const InfoRoles = ({ idRole, open, onClose }) => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();

    const [infoRole, setInfoRole] = useState({});
    const [loadingRoles, setLoadingRoles] = useState(false);

    useEffect(() => {
        if (!open) return;

        startLoading();
        setLoadingRoles(true);

        const loadData = async () => {
            try {
                const { status, dataResponse } = await getData(`${RUTA_API}/roles/${idRole}`);
                
                if (status >= 200 && status < 300) {
                    const mappedRole = {
                        name: dataResponse.role_name,
                        permissions: dataResponse.permissions.map(p => ({
                            idPermission: p.id_permission,
                            namePermission: p.permission_name,
                        })),
                        creationDate: dataResponse.creation_date,
                        updatedDate: dataResponse.update_date,
                        state: dataResponse.role_state
                    };

                    setInfoRole(mappedRole);
                }
            }
            catch (err) {
                toast.error(err);
            }
            finally {
                stopLoading();
                setLoadingRoles(false);
            }
        }

        loadData();
    }, [open, idRole]);

    const renderText = (text) => loadingRoles ? <Skeleton width="80%" /> : text;

    return (
        <PageModal
            maxWidth="sm"
            open={open}
            onClose={onClose}
            title={t('actions.infoShow')}
            sx={{
                "& .MuiDialog-container": {
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                },
            }}
            cancelText={t('navigation.close')}
            showActions
        >
            <List
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Badge />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.name') + ":"}
                        secondary={renderText(infoRole.name)}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Checklist />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('tables.permissions') + ":"}
                        secondary={renderText(
                            infoRole.permissions?.map(p => p.namePermission).join(", ") || ""
                        )}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            {loadingRoles ? <Skeleton variant="circular" width={40} height={40} /> :
                                (infoRole.state === 1 ? <ToggleOn /> : <ToggleOff />)
                            }
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('tables.state') + ":"}
                        secondary={renderText(`${infoRole.state === 1 ? 'Activo' : 'Inactivo'}`)}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CalendarMonth />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.creationDate') + ":"}
                        secondary={renderText(infoRole.creationDate)}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CalendarMonth />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.updateDate') + ":"}
                        secondary={renderText(infoRole.updatedDate || "N/A")}
                    />
                </ListItem>
            </List>
        </PageModal>
    );
}

export default InfoRoles;
