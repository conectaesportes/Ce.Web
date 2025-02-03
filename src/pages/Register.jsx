import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Auth.scss";
import Header from './Components/Header';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.email === email)) {
      setError('Usuário já cadastrado');
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Usuário cadastrado com sucesso');
    setTimeout(() => navigate('/'), 2000); // Redireciona para login após 2 segundos
  };

  return (
    <div className='Register page'>
      <Header></Header>
      <div className='container-body'>
        <div className='container-left'></div>
        <div className='container-right'>
          <div className='container-form'>
            <h2 className='title'>Registre-se</h2>
            <form onSubmit={handleRegister}>
            <label htmlFor="mail">Digite seu melhor e-mail:</label>
              <input
                type="email"
                placeholder="jogador@quadralivre.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirme sua senha:</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
              <button type="submit" className='button-green'>
                Cadastrar
              </button>
              <button type="submit" className='google-register'>
                <i className="fa-brands fa-google"></i>
                Entrar com o Google
              </button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
              Já tem uma conta? <a href="/">Faça login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
