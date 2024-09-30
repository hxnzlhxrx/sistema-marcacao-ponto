// src/components/AdminDashboards.js
import React, { useEffect, useState } from 'react';

const AdminDashboards = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard');
        const data = await response.json();
        if (response.ok) {
          setFuncionarios(data.funcionarios);
          setPontos(data.pontos);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Erro ao carregar dados.');
      }
    };

    fetchData();
  }, []);

  const handleDeleteFuncionario = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/funcionarios/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id));
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Erro ao deletar funcionário.');
    }
  };

  return (
    <div>
      <h2>Dashboard Admin</h2>
      {error && <p>{error}</p>}

      <h3>Funcionários</h3>
      <ul>
        {funcionarios.length > 0 ? (
          funcionarios.map((funcionario) => (
            <li key={funcionario.id}>
              {funcionario.nome} - CPF: {funcionario.cpf}
              <button onClick={() => handleDeleteFuncionario(funcionario.id)}>Excluir</button>
            </li>
          ))
        ) : (
          <p>Nenhum funcionário encontrado.</p>
        )}
      </ul>

      <h3>Registros de Ponto</h3>
      <ul>
        {pontos.length > 0 ? (
          pontos.map((ponto) => (
            <li key={ponto.id}>
              {ponto.data} - {ponto.tipo}
            </li>
          ))
        ) : (
          <p>Nenhum registro de ponto encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboards;


