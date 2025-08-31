import { forwardRef } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
    Slide,
} from "@mui/material";

import { Close } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            slots={{ transition: fullScreen ? Transition : null }}
            sx={sx}
            fullScreen={fullScreen}
            fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h6" component="span">{title}</Typography>
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
                    <Close />
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
