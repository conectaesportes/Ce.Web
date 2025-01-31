import "./SearchBar.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="search-bar">
        <input type="text" placeholder="Pesquise sua quadra preferida" />
        <FontAwesomeIcon icon={faSearch} className="icon" />
    </div>
    );
}

export default SearchBar;