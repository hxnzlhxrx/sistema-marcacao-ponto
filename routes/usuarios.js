const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');

// Rota para login de usuário
router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
      return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
  }

  try {
      // Procurar usuário pelo CPF
      db.get(`SELECT * FROM usuarios WHERE cpf = ?`, [cpf], async (err, user) => {
          if (err) {
              console.error('Erro ao buscar usuário:', err);
              return res.status(500).json({ error: 'Erro ao fazer login.' });
          }

          if (!user) {
              return res.status(400).json({ error: 'Usuário não encontrado.' });
          }

          // Comparar senha
          const match = await bcrypt.compare(senha, user.senha);

          if (!match) {
              return res.status(400).json({ error: 'Senha incorreta.' });
          }

          // Adicione um log para verificar o usuário encontrado
          console.log('Usuário encontrado:', user);

          // Retorna o funcionario_id
          res.json({ message: 'Login feito com sucesso!', funcionario_id: user.id });
      });
  } catch (error) {
      console.error('Erro no processo de login:', error);
      res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;


