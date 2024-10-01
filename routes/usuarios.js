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
  
            // Retorna o funcionario_id
            res.json({ message: 'Login feito com sucesso!', funcionario_id: user.id });
        });
    } catch (error) {
        console.error('Erro no processo de login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  });

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => { 
    const { nome, cpf, senha, role } = req.body;

    if (!nome || !cpf || !senha) {
        return res.status(400).json({ error: 'Nome, CPF e senha são obrigatórios.' });
    }

    try {
        // Verificar se o CPF já existe no banco de dados
        db.get(`SELECT * FROM usuarios WHERE cpf = ?`, [cpf], async (err, user) => {
            if (err) {
                console.error('Erro ao verificar usuário:', err);
                return res.status(500).json({ error: 'Erro ao registrar usuário.' });
            }

            if (user) {
                return res.status(400).json({ error: 'Usuário já existe.' });
            }

            // Criptografar a senha
            const hashedSenha = await bcrypt.hash(senha, 10);

            // Inserir o novo usuário no banco de dados
            db.run(`INSERT INTO usuarios (nome, cpf, senha, role) VALUES (?, ?, ?, ?)`,
                [nome, cpf, hashedSenha, role], function(err) {
                    if (err) {
                        console.error('Erro ao registrar usuário:', err);
                        return res.status(500).json({ error: 'Erro ao registrar usuário.' });
                    }

                    // Retorna uma resposta de sucesso com o ID do novo usuário
                    return res.status(201).json({ message: 'Usuário registrado com sucesso!', id: this.lastID });
                }
            );
        });
    } catch (error) {
        console.error('Erro no processo de registro:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
});

module.exports = router;


