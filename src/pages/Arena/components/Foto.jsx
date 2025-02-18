// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./Foto.scss";

const Foto = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "50%",
        padding: "1rem",
        bgcolor: "background.paper",
        border: "none",
        borderRadius: ".5rem",
        boxShadow: 24,
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <div className="container-img" onClick={openModal}>
                <h3 className="ampliar">Ver foto</h3>
                <img className="foto-quadra" src={props.link} alt="" />
            </div>
            <Modal
                className="modal-img-ampliada"
                open={modalIsOpen}
                onClose={closeModal}
            >
                <Box sx={{ ...style }}>
                    <img className="imagem-ampliada" src={props.link} alt="" />
                    <button className="close-modal" onClick={closeModal}>
                        Fechar
                    </button>
                </Box>
            </Modal>
        </div>
    );
};

Foto.propTypes = {
    link: PropTypes.string.isRequired,
};

export default Foto;
