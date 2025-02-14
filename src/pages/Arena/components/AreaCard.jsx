import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./AreaCard.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AreaCard = (props) => {
    AreaCard.propTypes = {
        quadra: PropTypes.shape({
            imgLink: PropTypes.string.isRequired,
            nome: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }).isRequired,
        slug: PropTypes.string.isRequired,
    };

    const navigate = useNavigate();

    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleClick = () => {
        navigate(`/ambiente-esportivo/${props.slug}/${props.quadra.id}`, {state:{quadra: props.quadra}}) // Navega para a rota "/detalhes"
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
        boxShadow: 24,
    };


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
                <button className="reserva-botao button-green" onClick={handleClick}>Reservar</button>
            </div>
            <Modal
                className="modal-img-ampliada"
                open={modalIsOpen}
                onClose={closeModal}
            >
                <Box sx={{ ...style }}>
                    <img
                        className="imagem-ampliada"
                        src={props.quadra.imgLink}
                        alt=""
                    />
                    <button className="close-modal" onClick={closeModal}>
                        Fechar
                    </button>
                </Box>
            </Modal>
        </div>
    );
};

export default AreaCard;
