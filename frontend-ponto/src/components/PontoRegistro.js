import React, { useState, useEffect } from 'react';

const PontoRegistro = () => {
  const [message, setMessage] = useState('');
  const [funcionarioId, setFuncionarioId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('funcionario_id');
    console.log('funcionario_id recuperado do localStorage:', id); 
    if (id) {
      setFuncionarioId(id); // Armazena o funcionario_id
    } else {
      setMessage('Funcionário não autenticado.');
    }
  }, []);

  const handleRegisterPonto = async (tipo) => {
    if (!funcionarioId) {
      setMessage('Funcionário não autenticado.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/ponto/${tipo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funcionario_id: funcionarioId }), 
      });

      const data = await response.json();
      console.log('Resposta da API:', data); // Log da resposta da API
      if (response.ok) {
        setMessage(`${tipo} registrado com sucesso!`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Erro ao registrar ponto:', error); // Log de erro
      setMessage('Erro ao registrar ponto.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('funcionario_id'); // Remove o funcionario_id do localStorage
    window.location.href = '/'; // Redireciona para a página de login
  };

  return (
    <div className="container ponto-container">
      <h2>Registro de Ponto</h2>
      <button onClick={() => handleRegisterPonto('entrada')}>Registrar Entrada</button>
      <button onClick={() => handleRegisterPonto('saida')}>Registrar Saída</button>
      <button onClick={handleLogout}>Logout</button> {/* Botão de Logout */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PontoRegistro;



