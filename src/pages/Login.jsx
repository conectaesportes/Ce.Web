import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/authApi';

import "./Auth.scss";
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
    <div className='Login page'>
      <Header></Header>
      <div className='container-body'>

        <div className='container-left'></div>
        <div className='container-right '>
          <div className='container-form'>
            <h2 className='title'>Entre na{"\n"}sua conta</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="mail">E-mail de acesso:</label>
              <input
                id='mail'
                type="email"
                placeholder="jogador@quadralivre.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Senha:</label>
              <input
                id='password'
                type="password"
                placeholder="••••••••••••"
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
      </div>

    </div>
  );
};

export default Login;