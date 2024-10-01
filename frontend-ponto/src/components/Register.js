import React, { useState } from 'react';

function Register() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [role, setRole] = useState('usuario');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmSenha) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, senha, role }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso!', data);
        window.location.href = '/'; 
      } else {
        setErrorMessage('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar cadastrar.');
    }
  };

  return (
    <div className="container register-container">
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn">Cadastrar</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Register;




