import { useTranslation } from 'react-i18next';
import { deleteData } from '../../utils/api/fetchMetods';
import { useLoader } from '../../context/LoaderContext';
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

import PageModal from '../../components/PageModal';

const RUTA_API = import.meta.env.VITE_API_URL;

const DeleteRoles = ({ idRole = 0, open, onClose, setRoleList }) => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();

    const deleteRole = async () => {
        startLoading();

        try {
            console.log(idRole);
            const { status, dataResponse } = await deleteData(`${RUTA_API}/roles/${idRole}`);

            if (status >= 200 && status < 300) {
                setRoleList(prev =>
                    prev.filter(role => role.idRole !== dataResponse)
                );

                toast.success(t('role.roleDeleted'));
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