import './Card.scss';


function Card(props) {
    return(
        <div className="card">
            <div className='logo'>
                <img className='image' src={props.logo}></img>
            </div>
            <div className="info">
                <h3 className='titulo'>{props.nome}</h3>
                <p className='endereco'>{`${props.endereco.rua}, ${props.endereco.numero} - ${props.endereco.bairro}`}</p>
            </div>
        </div>
    );

};

export default Card;