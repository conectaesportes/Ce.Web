import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import "./Register.scss";


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
    <div className='Register'>
      {/* <img className='logo' src={Logo} alt='Logotipo Quadra Livre'></img> */}
      <h2>Registre-se</h2>
      <form onSubmit={handleRegister}>
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
        <label>Confirme sua senha:</label>
        <input
          type="password"
          placeholder="Senha"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <button type="submit">
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
  );
};

export default Register;
