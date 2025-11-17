import { useState } from "react";
import "./Header.scss"; // Create a CSS file for styling
import Logo from "../../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { supabase } from "../../services/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { user, setUser } = useAuth();

  const handleLogout = async () => {

    let { error } = await supabase.auth.signOut();

     if (error) {
                console.log(error);
                toast.error("Erro ao sair.");
                // setLoading(false);
                return;
            }

    setUser(null);
    toast.success("Logout realizado com sucesso");
    navigate("/");
  };



  return (
    <header className="header-component">

      {(location.pathname !== "/" && location.pathname !== "/register" ) && 
        <div className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </div>
      }

      <img className="logo" src={Logo} alt="Logotipo Quadra Livre" ></img>

       {isOpen && (
        <div className="sidebar">
          <button className="close-btn" onClick={() => setIsOpen(false)}>X</button>
          <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/profile">Perfil</a>
            <a onClick={handleLogout}>Sair</a>
          </nav>
        </div>
      )}
      
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
