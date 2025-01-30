import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/authApi';

import "./Login.scss";
import Header from './Components/Header';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { token } = await login(email, password); //Chamada http
      loginUser(token); // Atualiza o contexto
      navigate('/dashboard');
    } catch (err) {
      setError(`'Credenciais inválidas'`);
      console.log(`${err}`);
    }
  };

  return (
    <div className='Login'>
      <Header></Header>
      <div className='container-form'>
        <h2 className='title'>Entre na{"\n"}sua conta</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='button-green'>Entrar</button>
          <button type="submit" className="google-register">
            <i className="fa-brands fa-google"></i>
            Entrar com o Google
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
      </div>
    </div>
  );
};

export default Login;