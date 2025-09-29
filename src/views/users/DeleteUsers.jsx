import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

import PageModal from '../../components/PageModal';

const DeleteUsers = ({ idUser = 0, open, onClose }) => {
    const { t } = useTranslation();

    const deleteUser = async () => {
        toast.success(t('user.userDeleted'));
        onClose();
    };

    return (
        <PageModal
            maxWidth="sm"
            open={open}
            onClose={onClose}
            title={t('user.deleteUser')}
            onConfirm={deleteUser}
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

export default DeleteUsers;
