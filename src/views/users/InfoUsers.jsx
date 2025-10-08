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
    Skeleton
} from '@mui/material';

import {
    Add,
    CalendarMonth,
    Edit,
    Email,
    Person,
    RecentActors,
    Security
} from '@mui/icons-material'

import PageModal from '../../components/PageModal';

const RUTA_API = import.meta.env.VITE_API_URL;

const InfoUsers = ({ idUser, open, onClose }) => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();

    const [infoUser, setInfoUser] = useState({});
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
        if (!open) return;

        startLoading();
        setLoadingUsers(true);

        const loadData = async () => {
            try {
                const { status, dataResponse } = await getData(`${RUTA_API}/users/${idUser}`);

                if (status >= 200 && status < 300) {
                    const mappedUser = {
                        names: dataResponse.names,
                        lastNames: dataResponse.last_names,
                        identificationType: dataResponse.identification_type,
                        identification: dataResponse.identification,
                        email: dataResponse.email,
                        creationDate: dataResponse.creation_date,
                        updatedDate: dataResponse.update_date,
                        role: {
                            idRole: dataResponse.role.id_role,
                            roleName: dataResponse.role.role_name
                        }
                    };

                    setInfoUser(mappedUser);
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
    }, [open, idUser]);

    const renderText = (text) => loadingUsers ? <Skeleton width="80%" /> : text;

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
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.fullName') + ":"}
                        secondary={renderText(`${infoUser.names} ${infoUser.lastNames}`)}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <RecentActors />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.identification') + ":"}
                        secondary={renderText(`${infoUser.identificationType}: ${infoUser.identification}`)}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Email />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.email') + ":"}
                        secondary={renderText(infoUser.email)}
                    />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Security />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.role') + ":"}
                        secondary={renderText(infoUser.role?.roleName || '')}
                    />
                </ListItem>

                {/* <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Add />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.createdBy') + ":"}
                        secondary={infoUser.createdBy}
                    />
                </ListItem> */}

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CalendarMonth />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.creationDate') + ":"}
                        secondary={renderText(infoUser.creationDate)}
                    />
                </ListItem>

                {/* <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Edit />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.updatedBy') + ":"}
                        secondary={infoUser.updatedBy}
                    />
                </ListItem> */}

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CalendarMonth />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={t('user.updateDate') + ":"}
                        secondary={renderText(infoUser.updatedDate)}
                    />
                </ListItem>
            </List>
        </PageModal>
    );
}

export default InfoUsers;
