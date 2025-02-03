import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./AreaCard.scss";
import PropTypes from "prop-types";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const AreaCard = (props) => {
    AreaCard.propTypes = {
        quadra: PropTypes.shape({
            imgLink: PropTypes.string.isRequired,
            nome: PropTypes.string.isRequired,
        }).isRequired,
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

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
        boxShadow: 24};

    return (
        <div className="container-quadra-card">
            <div className="container-img" onClick={openModal}>
                <h3 className="ampliar">Ver foto</h3>
                <img
                    className="foto-quadra"
                    src={props.quadra.imgLink}
                    alt=""
                />
            </div>
            <div className="container-info">
                <h3 className="title">{props.quadra.nome}</h3>
                <p className="descricao">
                    Tipo: Areia - Modalidade: Poliesportiva - Material incluso{" "}
                </p>
                <button className="reserva-botao button-green">Reservar</button>
            </div>
            <Modal
                className="modal"
                open={modalIsOpen}
                onClose={closeModal}
            >
                <Box sx={{ ...style }}>
                    <button className="close-modal" onClick={closeModal}>Fechar</button>
                    <img className="imagem-ampliada" src={props.quadra.imgLink} alt="" />
                </Box>
            </Modal>
        </div>
    );
};

export default AreaCard;
