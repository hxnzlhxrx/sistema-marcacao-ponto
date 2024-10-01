const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// rota para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, 'database.sqlite');

// conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    throw err;
  }
  console.log('Conectado ao banco de dados SQLite.');

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      biometria_hash TEXT NOT NULL,
      escala TEXT NOT NULL,
      cargo TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      hora_entrada TEXT,
      hora_saida TEXT,
      atraso INTEGER DEFAULT 0,
      horas_extras INTEGER DEFAULT 0,
      FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      role TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ponto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER NOT NULL,
      data DATE NOT NULL,
      hora_entrada TIME NOT NULL,
      hora_saida TIME,
      horas_extras REAL DEFAULT 0,
      atraso REAL DEFAULT 0,
      FOREIGN KEY (funcionario_id) REFERENCES usuarios(id)
    )`);
  });
});

module.exports = db;

