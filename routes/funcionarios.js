const express = require('express'); 
const router = express.Router();
const db = require('../database/db');

// Rota para obter todos os funcionários
router.get('/', (req, res) => {
  db.all('SELECT * FROM funcionarios', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Rota para adicionar um funcionário
router.post('/', (req, res) => {
  const { nome, biometria_hash, escala, cargo } = req.body;
  db.run(`INSERT INTO funcionarios (nome, biometria_hash, escala, cargo) VALUES (?, ?, ?, ?)`, [nome, biometria_hash, escala, cargo], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Funcionário criado com sucesso!', id: this.lastID });
  });
});

module.exports = router;

