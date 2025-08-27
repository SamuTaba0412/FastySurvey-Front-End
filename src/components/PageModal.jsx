import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PageModal = ({
    maxWidth,
    open,
    onClose,
    title,
    children,
    onConfirm,
    sx = {
        "& .MuiDialog-container": {
            alignItems: "flex-center",
            justifyContent: "flex-center",
        },
    },
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    showActions = true
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            sx={sx}
            fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h6">{title}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>{children}</DialogContent>

            {showActions && (
                <DialogActions>
                    {onConfirm && (
                        <Button onClick={onConfirm} color="success" variant="contained">
                            {confirmText}
                        </Button>
                    )}
                    <Button onClick={onClose} color="error" variant="contained">
                        {cancelText}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default PageModal;
