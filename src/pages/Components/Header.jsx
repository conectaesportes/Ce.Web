import { useState } from 'react';
import './Header.scss'; // Create a CSS file for styling
import Logo from '../../assets/logo.svg';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header-component">
            <img className='logo' src={Logo} alt='Logotipo Quadra Livre'></img>

            <nav className={`nav ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <div className="menu-icon" onClick={toggleSidebar}>
                &#9776;
            </div>
        </header>
    );
};

export default Header;