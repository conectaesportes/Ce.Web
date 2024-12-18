import React from "react";
import "./FilterBar.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const FilterBar = () => {
    return(
        <div className="bar">
            <FontAwesomeIcon icon={faFilter} className="icon"></FontAwesomeIcon>
            <button className="buttonBar">Preço</button>
            <button className="buttonBar">Distância</button>
            <button className="buttonBar">Relevância</button>
        </div>
    )
}

export default FilterBar;