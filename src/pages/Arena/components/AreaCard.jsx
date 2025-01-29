import './AreaCard.scss';

const AreaCard = (props) => {


    return(
        <div className="container-quadra-card">
            <div className="container-img">
                <img className='foto-quadra' src={props.quadra.imgLink} alt="" />
            </div>
            <div className='container-info'>
                <h3>{props.quadra.nome}</h3>
                <p>Tipo: Areia<br/>Modalidade: Poliesportiva<br/>Material incluso </p>
                <button className='reserva-botao' >Reservar</button>
            </div>
        </div>
    );
};

export default AreaCard;