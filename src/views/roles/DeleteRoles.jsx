import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

import PageModal from '../../components/PageModal';

const DeleteRoles = ({ idRole = 0, open, onClose }) => {
    const { t } = useTranslation();

    const deleteRole = async () => {
        toast.success(t('role.roleDeleted'));
        onClose();
    };

    return (
        <PageModal
            maxWidth="sm"
            open={open}
            onClose={onClose}
            title={t('role.deleteRole')}
            onConfirm={deleteRole}
            sx={{
                "& .MuiDialog-container": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
            confirmText={t('actions.confirm')}
            cancelText={t('actions.cancel')}
            showActions
        >
            <Typography variant="body2">{t('user.deleteRegister')}</Typography>
        </PageModal>
    );
}

export default DeleteRoles;