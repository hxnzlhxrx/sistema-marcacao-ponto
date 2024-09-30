// src/routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Rota para obter dados do dashboard de admin
router.get('/dashboard', (req, res) => {
  db.all('SELECT * FROM funcionarios', [], (err, funcionarios) => {
    if (err) {
      console.error('Erro ao buscar funcionários:', err);
      return res.status(500).json({ error: 'Erro ao buscar funcionários.' });
    }

    db.all('SELECT * FROM pontos', [], (err, pontos) => {
      if (err) {
        console.error('Erro ao buscar registros de ponto:', err);
        return res.status(500).json({ error: 'Erro ao buscar registros de ponto.' });
      }

      res.json({ funcionarios, pontos });
    });
  });
});

module.exports = router;


