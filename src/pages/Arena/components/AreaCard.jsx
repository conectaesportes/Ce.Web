import "./AreaCard.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Foto from "./Foto";

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

    const handleClick = () => {
        navigate(`/ambiente-esportivo/${props.slug}/${props.quadra.id}`, {state:{quadra: props.quadra}}) // Navega para a rota "/detalhes"
};

    return (
        <div className="container-quadra-card">
            <Foto link={props.quadra.imgLink}></Foto>
            <div className="container-info">
                <h3 className="title">{props.quadra.nome}</h3>
                <p className="descricao">
                    Tipo: Areia - Modalidade: Poliesportiva - Material incluso{" "}
                </p>
                <button className="reserva-botao button-green" onClick={handleClick}>Reservar</button>
            </div>
        </div>
    );
};

export default AreaCard;
