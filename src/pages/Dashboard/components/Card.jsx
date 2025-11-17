import './Card.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';



function Card(props) {
    
    Card.propTypes = {
        ambiente: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired,
            nome: PropTypes.string.isRequired,
            endereco: PropTypes.shape({
                rua: PropTypes.string.isRequired,
                numero: PropTypes.string.isRequired,
                bairro: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    };
    const navigate = useNavigate();
    
    const handleDivClick = () => {
        navigate(`/ambiente-esportivo/${props.ambiente.slug}`); // Navega para a rota "/detalhes"
      };
    
    return(
        <div className="card" onClick={handleDivClick}>
            <div className='logo-container'>
                <img className='logo-quadra' src={props.ambiente.logo}></img>
            </div>
            <div className="info">
                <h3 className='titulo'>{props.ambiente.nome}</h3>
                <p className='endereco'>{`${props.ambiente.endereco.rua}, ${props.ambiente.endereco.numero} - ${props.ambiente.endereco.bairro}`}</p>
            </div>
        </div>
    );

};

export default Card;