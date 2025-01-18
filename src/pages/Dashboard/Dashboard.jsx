import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import DragList from './components/DragList';
import logo from '../../assets/pin.svg';
import user_pin from '../../assets/user-pin.svg';
import arenas from "../../data/arenas";

import "./Dashboard.scss";

const Dashboard = () => {
  const [location, setLocation] = useState(null); // Para armazenar latitude e longitude
  const [error, setError] = useState(null); // Para armazenar mensagens de erro

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocalização não é suportada pelo seu navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //setLocation({ latitude, longitude });
          setError(null); // Limpa qualquer erro anterior
        },
        (err) => {
          setError('Erro ao obter localização: ' + err.message);
          setLocation(null); // Limpa a localização em caso de erro
        }
      );
    };

    getLocation(); // Chama a função automaticamente
    setLocation({latitude: -6.4809207708582175, longitude: -36.15237888779963});
  }, []);

  console.log(location)

  const customIcon = new L.Icon({
    iconUrl: logo, // URL do ícone
    iconSize: [40, 40], // Tamanho do ícone
    iconAnchor: [20, 40], // Ponto de ancoragem (base do pin)
    popupAnchor: [0, -40] // Ponto de ancoragem do popup
  });
  const userPin = new L.Icon({
    iconUrl: user_pin, // URL do ícone
    iconSize: [20, 20], // Tamanho do ícone
    iconAnchor: [10, 20], // Ponto de ancoragem (base do pin)
    popupAnchor: [0, -20] // Ponto de ancoragem do popup
  });

  return (
    <div className='container-dashboard'>

      <div className='overlay-navbar'>
        <SearchBar></SearchBar>
        <FilterBar></FilterBar>
      </div>

      <div className='map'>
        <DragList className='list-cards'></DragList>
        {location ? (
          <MapContainer className='container-map' center={[location.latitude, location.longitude]} zoom={15} style={{ height: 'inherit', width: 'inherit' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {arenas.map((arena, chave) => {
              return(
              <Marker key={chave} position={arena.endereco.coordenadas} icon={customIcon}>
                <Popup>{arena.nome}</Popup>
              </Marker>
              );
            })}
            <Marker position={[location.latitude, location.longitude]} icon={userPin}>
              <Popup>Seu local</Popup>
            </Marker>
          </MapContainer>
        ) : (
          !error && <p>Obtendo localização...</p>
        )}
      </div>
      <div className='bottom-bar'>
        <ul className='list-menu'>
          <li className='menu-item'>
            <i className="fa fa-home" aria-hidden="true"></i>
          </li>
          <li className='menu-item'>
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </li>
          <li className='menu-item'>
            <i className="fa fa-comments" aria-hidden="true"></i>
          </li>
          <li className='menu-item'>
            <i className="fa fa-user" aria-hidden="true"></i>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
