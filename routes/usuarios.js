const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Rota para registrar um novo usuário
router.post('/register', (req, res) => {
  const { nome, email, senha, role } = req.body;
  db.run(`INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)`, [nome, email, senha, role], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário registrado com sucesso!', id: this.lastID });
  });
});

// Rota para login de usuário
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get(`SELECT * FROM usuarios WHERE email = ? AND senha = ?`, [email, senha], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(400).json({ error: 'Credenciais inválidas' });
      return;
    }
    res.json({ message: 'Login feito com sucesso!', user: row });
  });
});

module.exports = router;

