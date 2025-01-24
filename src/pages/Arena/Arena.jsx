
import arenas from '../../data/arenas';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import AreaCard from './components/AreaCard';

import './Arena.scss';

const Arena = () => {

    const { slug } = useParams(); // Recupera o slug da URL
    const pageData = arenas.find((item) => item.slug === slug); // Busca dados com base no slug
    
    if (!pageData) {
        return <h1>Página não encontrada</h1>;
    }
    
    return(
        <div className='container-arena'>
            <div className='header'>
                <div className='container-logo'>
                    <img src={pageData.logo}></img>
                </div>
                <div className='container-info'>
                    <h3 className='title'>{pageData.nome}</h3>
                    <p>{pageData.endereco.rua}, {pageData.endereco.numero} - {pageData.endereco.bairro}</p>
                </div>
            </div>
            <div className='main'>
                <h3 style={{marginLeft:'10px'}}>Quadras Livres</h3>
                
                <div className='list-areas'>
                {pageData.areasDeJogo.map((area) => {
                    return(
                        <AreaCard key={area.nome} quadra={area}></AreaCard>
                    );
                })}
                </div>
            </div>
        </div>
    )



};


export default Arena;