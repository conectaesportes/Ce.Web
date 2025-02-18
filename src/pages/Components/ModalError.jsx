// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ModalError = ({message, onClose}) => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "fit-content",
        padding: "1rem",
        bgcolor: "background.paper",
        border: "none",
        borderRadius: ".5rem",
        boxShadow: 24,
    };

    if(!message) return null;

    return (
        <Modal
            className="modal-img-ampliada"
            open={!!message}
            onClose={onClose}
        >
            <Box sx={{ ...style }}>
                <p>{message}</p>
                <button className="close-modal" onClick={onClose}>
                    Fechar
                </button>
            </Box>
        </Modal>
    );
};

ModalError.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalError;
