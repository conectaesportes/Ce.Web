
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import arenas from "../../../data/arenas";
import Card from "./CArd";
const CardList = () => {


    return(
        <div className="card-list" style={{width: '100%', height: '95%', display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            {arenas.map((arena, key)=>{
               return(
                   <Card key={key} logo={arena.logo} nome={arena.nome} endereco={arena.endereco}></Card>
               ) 
            })}

        </div>
    );



};

export default CardList;