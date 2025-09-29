import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

import PageModal from '../../components/PageModal';

const DeleteSections = ({ open, onClose, erase }) => {
    const { t } = useTranslation();

    return (
        <PageModal
            maxWidth="sm"
            open={open}
            onClose={onClose}
            title={t('survey.deleteSection') + "?"}
            onConfirm={erase}
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
            <Typography variant="body2">{t('survey.confirmDeleteSection')}</Typography>
        </PageModal>
    );
}

export default DeleteSections;