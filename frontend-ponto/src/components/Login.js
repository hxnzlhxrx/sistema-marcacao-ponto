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
        body: JSON.stringify({ cpf, senha }),  // Envia o CPF e a senha do formulário
      });
  
      const data = await response.json();
      console.log('Resposta da API:', data); // Log API
  
      if (response.ok) {
        
        const funcionarioId = data.user ? data.user.id : undefined;
  
        if (funcionarioId) {
          // Salvar o funcionario_id no localStorage para usar depois
          localStorage.setItem('funcionario_id', funcionarioId);
          console.log('funcionario_id salvo no localStorage:', localStorage.getItem('funcionario_id')); // Verifica se o ID foi salvo
  
          // Redirecionar para a pagina de registro de ponto
          window.location.href = '/funcionario-ponto';  // Redireciona após login
        } else {
          setMessage('ID do funcionário não encontrado.');
        }
      } else {
        
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error); // Log do erro
      setMessage('Erro ao tentar fazer login.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // 
  };

  return (
    <div className="container login-container">
      <h2>Sistema De Marcação De Ponto - GRUPO 3</h2>
      <h2>LOGIN</h2>
      <input
        type="text"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Digite seu CPF"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
      />
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={handleRegisterRedirect}>Cadastrar</button> {/* Botão de cadastro */}
      {message && <p>{message}</p>}
    </div> 
  );
};

export default Login;




