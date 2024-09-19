const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Rota para ver todos os registros de ponto
router.get('/relatorios', (req, res) => {
  db.all('SELECT * FROM ponto', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Rota para modificar registros de ponto
router.put('/modificar-ponto/:id', (req, res) => {
  const { hora_entrada, hora_saida } = req.body;
  const id = req.params.id;
  db.run(`UPDATE ponto SET hora_entrada = ?, hora_saida = ? WHERE id = ?`, [hora_entrada, hora_saida, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de ponto modificado com sucesso!' });
  });
});

module.exports = router;
