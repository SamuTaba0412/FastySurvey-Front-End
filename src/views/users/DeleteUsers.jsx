import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

import PageModal from '../../components/PageModal';

const DeleteUsers = ({ idUsuario = 0, open, onClose }) => {
    const { t } = useTranslation();

    const deleteUser = async () => {
        toast.success(t('userDeleted'));
        onClose();
    };

    return (
        <>
            <PageModal
                maxWidth="sm"
                open={open}
                onClose={onClose}
                title={t('deleteUser')}
                onConfirm={deleteUser}
                sx={{
                    "& .MuiDialog-container": {
                        display: "flex",
                        alignItems: "flex-center",
                        justifyContent: "flex-center",
                    },
                }}
                confirmText={t('confirm')}
                cancelText={t('cancel')}
                showActions
            >
                <Typography variant="body2">{t('deleteRegister')}</Typography>
            </PageModal>
        </>
    );
}

export default DeleteUsers;