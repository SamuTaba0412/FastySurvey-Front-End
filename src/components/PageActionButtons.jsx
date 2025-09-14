import {
    Box,
    Button,
    Tooltip
} from '@mui/material';

import {
    Visibility,
    Edit,
    Delete
} from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

const PageActionButtons = ({
    onView,
    onEdit,
    onDelete,
    showView,
    showEdit,
    showDelete,
    customButtons = []
}) => {
    const { t } = useTranslation();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
        >
            {showView && (
                <Tooltip title={t('actions.info')}>
                    <Button
                        size="small"
                        variant="contained"
                        color="info"
                        sx={{ minWidth: 'auto', padding: '8px' }}
                        onClick={onView}
                    >
                        <Visibility />
                    </Button>
                </Tooltip>
            )}

            {showEdit && (
                <Tooltip title={t('user.edit')}>
                    <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        sx={{ minWidth: 'auto', padding: '8px' }}
                        onClick={onEdit}
                    >
                        <Edit />
                    </Button>
                </Tooltip>
            )}

            {showDelete && (
                <Tooltip title={t('user.delete')}>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ minWidth: 'auto', padding: '8px' }}
                        onClick={onDelete}
                    >
                        <Delete />
                    </Button>
                </Tooltip>
            )}

            {customButtons.map((btn, idx) => (
                <Tooltip key={idx} title={btn.tooltip || ''}>
                    <Button
                        size="small"
                        variant="contained"
                        color={btn.color || 'primary'}
                        sx={{ minWidth: 'auto', padding: '8px' }}
                        onClick={btn.onClick}
                    >
                        {btn.icon}
                    </Button>
                </Tooltip>
            ))}
        </Box>
    );
}

export default PageActionButtons;