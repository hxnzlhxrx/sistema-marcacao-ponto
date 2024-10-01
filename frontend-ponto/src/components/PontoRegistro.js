import React, { useState, useEffect } from 'react';

const PontoRegistro = () => {
  const [message, setMessage] = useState('');
  const [funcionarioId, setFuncionarioId] = useState(null);

  // Use o useEffect para recuperar o funcionario_id assim que o componente montar
  useEffect(() => {
    const id = localStorage.getItem('funcionario_id');
    console.log('funcionario_id recuperado do localStorage:', id); // 
    if (id) {
      setFuncionarioId(id); 
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
      console.log('Resposta da API:', data); 
      if (response.ok) {
        setMessage(`${tipo} registrado com sucesso!`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Erro ao registrar ponto:', error); 
      setMessage('Erro ao registrar ponto.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('funcionario_id'); 
    window.location.href = '/'; 
  };

  return (
    <div className="container ponto-container">
      <h2>Registro de Ponto</h2>
      <button onClick={() => handleRegisterPonto('entrada')} className="btn">Registrar Entrada</button>
      <button onClick={() => handleRegisterPonto('saida')} className="btn">Registrar Saída</button>
      <button onClick={handleLogout} className="btn">Logout</button> {/* Botão de Logout */}
      {message && <p className="error">{message}</p>}
    </div>
  );
};


export default PontoRegistro;








