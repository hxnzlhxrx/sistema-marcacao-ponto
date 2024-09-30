const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Função para obter a hora local
function getLocalTime() {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000; // Offset em milissegundos
    const localTime = new Date(now.getTime() - timezoneOffset); // Ajuste o horário
    return localTime.toISOString().split('T')[1].split('.')[0]; // Retorna a hora no formato HH:MM:SS
}

// Marcar entrada
router.post('/entrada', (req, res) => {
    const { funcionario_id } = req.body;
    const dataAtual = new Date().toISOString().split('T')[0]; // Data no formato YYYY-MM-DD

    if (!funcionario_id) {
        return res.status(400).json({ error: 'ID do funcionário é necessário' });
    }

    const horaAtual = getLocalTime(); // Usando a hora local ajustada

    const query = `INSERT INTO ponto (funcionario_id, data, hora_entrada) VALUES (?, ?, ?)`;

    db.run(query, [funcionario_id, dataAtual, horaAtual], function (err) {
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
    const dataAtual = new Date().toISOString().split('T')[0];

    if (!funcionario_id) {
        return res.status(400).json({ error: 'ID do funcionário é necessário' });
    }

    const horaAtual = getLocalTime(); // Usando a hora local ajustada

    const query = `UPDATE ponto SET hora_saida = ? WHERE funcionario_id = ? AND data = ?`;

    db.run(query, [horaAtual, funcionario_id, dataAtual], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Saída registrada com sucesso', id: this.lastID });
    });
});

module.exports = router;




