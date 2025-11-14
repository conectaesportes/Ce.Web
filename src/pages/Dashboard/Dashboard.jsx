import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import DragList from "./components/DragList";
import Header from "../../pages/Components/Header";
import L from "leaflet";
import logo from "../../assets/pin.svg";
import user_pin from "../../assets/user-pin.svg";
import arenas from "../../data/arenas";
import { useNavigate } from 'react-router-dom';
import "./Dashboard.scss";
import "./MapLeaflet.scss";

const Dashboard = () => {
    const [location, setLocation] = useState(null); // Para armazenar latitude e longitude
    const [error, setError] = useState(null); // Para armazenar mensagens de erro

    //pega o local atual do usuario
    useEffect(() => {
        const getLocation = () => {
            if (!navigator.geolocation) {
                setError("Geolocalização não é suportada pelo seu navegador.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // eslint-disable-next-line no-unused-vars
                    const { latitude, longitude } = position.coords;
                    //setLocation({ latitude, longitude });
                    setError(null); // Limpa qualquer erro anterior
                },
                (err) => {
                    setError("Erro ao obter localização: " + err.message);
                    setLocation(null); // Limpa a localização em caso de erro
                }
            );
        };

        getLocation(); // Chama a função automaticamente
        setLocation({
            latitude: -6.4809207708582175,
            longitude: -36.15237888779963,
        });
    }, []);

    console.log(location);
    
    const navigate = useNavigate();

    // Configuração do ícone personalizado

    const customIcon = new L.Icon({
        className: "icon-pin",
        iconUrl: logo, // URL do ícone
        iconSize: [40, 40], // Tamanho do ícone
        iconAnchor: [20, 40], // Ponto de ancoragem (base do pin)
        popupAnchor: [0, -40],// Ponto de ancoragem do popup
        tooltipAnchor: [0, -40], // Ponto de ancoragem da tooltip
    });

    const userPin = new L.Icon({
        iconUrl: user_pin, // URL do ícone
        iconSize: [20, 20], // Tamanho do ícone
        iconAnchor: [10, 20], // Ponto de ancoragem (base do pin)
        popupAnchor: [0, -20], // Ponto de ancoragem do popup
    });

    const handleDivClick = (slug) => {
        navigate(`/ambiente-esportivo/${slug}`); // Navega para a rota "/detalhes"
      };

    return (
        <div className="container-dashboard">
            <Header></Header>
            <div className="overlay-navbar">
                <SearchBar></SearchBar>
                <FilterBar></FilterBar>
            </div>

            <div className="map">
                <DragList className="list-cards"></DragList>

                {location ? (
                    <MapContainer
                        className="container-map"
                        center={[location.latitude, location.longitude]}
                        zoom={14}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        {arenas.map((arena, chave) => {
                            return (
                                <Marker

                                    key={chave}
                                    position={arena.endereco.coordenadas}
                                    icon={customIcon}
                                    eventHandlers={{
                                        click: () => {
                                            handleDivClick(arena.slug);
                                        },
                                    }}
                                >
                                    <Tooltip
                                        permanent
                                        direction="top"
                                    >
                                        {arena.nome}
                                    </Tooltip>
                                  
                                </Marker>
                            );
                        })}
                        <Marker
                            position={[location.latitude, location.longitude]}
                            icon={userPin}
                        >
                            <Popup>Seu local</Popup>
                        </Marker>
                    </MapContainer>
                ) : (
                    !error && <p>Obtendo localização...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
