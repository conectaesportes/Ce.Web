import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.scss';
import Arena from './pages/Arena/Arena';
import { AuthProvider } from './context/AuthContext';
import Reserva from './pages/Reserva/Reserva';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ambiente-esportivo/:slug" element={<Arena />} />
            <Route path="/ambiente-esportivo/:slug/reserva" element={<Reserva />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
