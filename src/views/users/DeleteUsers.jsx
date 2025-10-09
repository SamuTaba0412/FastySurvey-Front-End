import { useTranslation } from 'react-i18next';
import { deleteData } from '../../utils/api/fetchMetods';
import { useLoader } from '../../context/LoaderContext';
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

import PageModal from '../../components/PageModal';

const DeleteUsers = ({ idUser, open, onClose, setUserList }) => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();

    const deleteUser = async () => {
        startLoading();

        try {
            const { status, dataResponse } = await deleteData(`/users/${idUser}`);

            if (status >= 200 && status < 300) {
                setUserList(prev =>
                    prev.filter(user => user.idUser !== dataResponse)
                );

                toast.success(t('user.userDeleted'));
                onClose();
            }
            else if (status >= 400 && status < 500) {
                toast.warning(`${status}: ${dataResponse.detail}`)
            }
        }
        catch (err) {
            toast.error(err);
        }
        finally {
            stopLoading();
        }
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
