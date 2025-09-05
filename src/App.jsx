import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.scss';
import Arena from './pages/Arena/Arena';
import { AuthContextProvider } from './context/AuthContext';
import Reserva from './pages/Reserva/Reserva';
import Agendamento from './pages/Arena/Agendamento';
import LoginSupabase from './pages/LoginSupabase';
import ProtectedRoute from './pages/RouterProtected';


const App = () => {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginSupabase />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/ambiente-esportivo/:slug" element={
              <ProtectedRoute>
                <Arena />
              </ProtectedRoute>
            } />
            <Route path="/ambiente-esportivo/:slug/:id" element={
              <ProtectedRoute>
                <Agendamento />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
