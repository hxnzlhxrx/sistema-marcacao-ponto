const express = require('express');
const cors = require('cors'); // Importe o CORS
const bodyParser = require('body-parser');

// Importar rotas
const funcionariosRoutes = require('./routes/funcionarios');
const usuariosRoutes = require('./routes/usuarios');
const pontoRoutes = require('./routes/ponto');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware para interpretar JSON nas requisições
app.use(bodyParser.json());

// Rotas
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ponto', pontoRoutes);
app.use('/api/admin', adminRoutes);  // Admin dashboard e funções

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

