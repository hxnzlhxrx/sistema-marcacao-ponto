import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha }),  
      });
  
      const data = await response.json();
  
      if (response.ok) {
        
        const funcionarioId = data.funcionario_id;
  
        if (funcionarioId) {
          
          localStorage.setItem('funcionario_id', funcionarioId);
          console.log('funcionario_id salvo no localStorage:', localStorage.getItem('funcionario_id'));
  
          window.location.href = '/funcionario-ponto'; 
        } else {
          setMessage('ID do funcionário não encontrado.');
        }
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setMessage('Erro ao tentar fazer login.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="container login-container">
      <h2> SITEMA DE MARCAÇÃO DE PONTO Bem-vindo!</h2>
      <input
        type="text"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Digite seu CPF"
        className="input-field"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
        className="input-field"
      />
      <button onClick={handleLogin} className="btn">Entrar</button>
      <button onClick={handleRegisterRedirect} className="btn">Cadastrar</button>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Login;









