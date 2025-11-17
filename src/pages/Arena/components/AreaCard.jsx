import "./AreaCard.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Foto from "./Foto";

const AreaCard = (props) => {
    AreaCard.propTypes = {
        quadra: PropTypes.shape({
            image_url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
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
            <Foto link={props.quadra.image_url}></Foto>
            <div className="container-info">
                <h3 className="title">{props.quadra.name}</h3>
                <p className="descricao">
                    Tipo: Areia - Modalidade: Poliesportiva - Material incluso{" "}
                </p>
                <button className="reserva-botao button-green" onClick={handleClick}>Reservar</button>
            </div>
        </div>
    );
};

export default AreaCard;
