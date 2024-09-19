const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Marcar entrada
router.post('/entrada', (req, res) => {
    const { funcionario_id } = req.body;
    const dataAtual = new Date().toISOString().split('T')[0];  // Gerar a data no formato YYYY-MM-DD

    const query = `INSERT INTO ponto (funcionario_id, data, hora_entrada) VALUES (?, ?, TIME('now'))`;

    db.run(query, [funcionario_id, dataAtual], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Entrada registrada com sucesso', id: this.lastID });
    });
});

// Marcar saída
router.post('/saida', (req, res) => {
    const { funcionario_id } = req.body;
    const dataAtual = new Date().toISOString().split('T')[0];  // Gerar a data no formato YYYY-MM-DD

    const query = `UPDATE ponto SET hora_saida = TIME('now') WHERE funcionario_id = ? AND data = ? AND hora_saida IS NULL`;

    db.run(query, [funcionario_id, dataAtual], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Saída registrada com sucesso', changes: this.changes });
    });
});

module.exports = router;

// Marcar saída
router.post('/saida', (req, res) => {
    const { funcionario_id } = req.body;  // Use `funcionario_id` para manter consistência
    
    if (!funcionario_id) {
        return res.status(400).json({ error: 'ID do funcionário é necessário' });
    }

    const query = `INSERT INTO ponto (funcionario_id, hora_saida) VALUES (?, ?)`;

    db.run(query, [funcionario_id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Saída registrada com sucesso', id: this.lastID });
    });
});

module.exports = router;


