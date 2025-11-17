import arenas from "../../../data/arenas";
import Card from "./Card";
const CardList = () => {


    return(
        <div className="card-list" style={{width: '100%', height: '95%', display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            {arenas.map((arena, key)=>{
               return(
                   <Card key={key} ambiente={arena}></Card>
               ) 
            })}

        </div>
    );



};

export default CardList;