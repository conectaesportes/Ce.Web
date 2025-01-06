import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import DragList from './components/DragList';

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
          setLocation({ latitude, longitude });
          setError(null); // Limpa qualquer erro anterior
        },
        (err) => {
          setError('Erro ao obter localização: ' + err.message);
          setLocation(null); // Limpa a localização em caso de erro
        }
      );
    };

    getLocation(); // Chama a função automaticamente
  }, []);

  console.log(location)

  return (
    <div className='container-dashboard'>

      <div className='overlay-navbar'>
        <SearchBar></SearchBar>
        <FilterBar></FilterBar>
      </div>

      <div className='map'>
        <DragList className='list-cards'></DragList>
        {location ? (
          <MapContainer className='container-map' center={[location.latitude, location.longitude]} zoom={13} style={{ height: 'inherit', width: 'inherit' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>Um marcador simples!</Popup>
            </Marker>
          </MapContainer>
        ) : (
          !error && <p>Obtendo localização...</p>
        )}
      </div>
      <div className='bottom-bar'>
        <ul className='list-menu'>
          <li className='menu-item'>
            <i class="fa fa-home" aria-hidden="true"></i>
          </li>
          <li className='menu-item'>
            <i class="fa fa-calendar" aria-hidden="true"></i>
          </li>
          <li className='menu-item'>
            <i class="fa fa-comments" aria-hidden="true"></i>
          </li>
          <li className='menu-item'>
            <i class="fa fa-user" aria-hidden="true"></i>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
