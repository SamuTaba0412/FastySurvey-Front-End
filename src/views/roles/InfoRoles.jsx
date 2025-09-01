import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
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

const InfoRoles = ({ idRole = 0, open, onClose }) => {
    const { t } = useTranslation();

    const [infoRole, setInfoRole] = useState({
        name: "Administrator",
        permissions: ["Manage Users", "Manage Roles"],
        createdBy: "Samuel Tabares Patiño",
        creationDate: new Date(),
        updatedBy: "Samuel Tabares Patiño",
        updatedDate: new Date(),
        state: 1
    });

    return (
        <>
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
                            secondary={`${infoRole.name}`}
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
                            secondary={`${infoRole.permissions.join(", ")}`}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {
                                    infoRole.state === 1 ? (
                                        <ToggleOn />
                                    ) : (
                                        <ToggleOff />
                                    )
                                }
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('tables.state') + ":"}
                            secondary={`${infoRole.state === 1 ? 'Activo' : 'Inactivo'}`}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.createdBy') + ":"}
                            secondary={infoRole.createdBy}
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
                            secondary={infoRole.creationDate.toDateString()}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Edit />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.updatedBy') + ":"}
                            secondary={infoRole.updatedBy}
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
                            secondary={infoRole.updatedDate.toDateString()}
                        />
                    </ListItem>
                </List>
            </PageModal>
        </>
    );
}

export default InfoRoles;