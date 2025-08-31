import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
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

const InfoUsers = ({ idUsuario = 0, open, onClose }) => {
    const { t } = useTranslation();

    const [infoUser, setInfoUser] = useState({
        names: "Samuel",
        lastNames: "Tabares Patiño",
        identificationType: {
            idIdentificationType: 1,
            identificationName: "C.C."
        },
        identification: "1017923676",
        email: "samutabares09022005@gmail.com",
        createdBy: "Samuel Tabares Patiño",
        creationDate: new Date(),
        updatedBy: "Samuel Tabares Patiño",
        updatedDate: new Date(),
        role: {
            idRole: 1,
            roleName: "Administrador"
        }
    });

    return (
        <>
            <PageModal
                maxWidth="sm"
                open={open}
                onClose={onClose}
                title={t('infoShow')}
                sx={{
                    "& .MuiDialog-container": {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-center",
                    },
                }}
                cancelText={t('close')}
                showActions
            >
                <List
                    sx={(theme) => ({
                        width: "100%",
                        height: "100%",
                        bgcolor:
                            theme.palette.mode === "light"
                                ? theme.palette.grey[200] // fondo cuando es light
                                : theme.palette.background.paper, // fondo cuando es dark
                        borderRadius: 2,
                    })}
                >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('fullName') + ":"} secondary={`${infoUser.names} ${infoUser.lastNames}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <RecentActors />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('identification') + ":"} secondary={`${infoUser.identificationType.identificationName}: ${infoUser.identification}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Email />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('email') + ":"} secondary={infoUser.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Security />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('role') + ":"} secondary={infoUser.role.roleName} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('createdBy') + ":"} secondary={infoUser.createdBy} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('creationDate') + ":"} secondary={infoUser.creationDate.toDateString()} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Edit />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('updatedBy') + ":"} secondary={infoUser.updatedBy} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={t('updateDate') + ":"} secondary={infoUser.updatedDate.toDateString()} />
                    </ListItem>
                </List>
            </PageModal >
        </>
    );
}

export default InfoUsers;