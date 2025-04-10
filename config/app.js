// app.js
const db = require('./db'); // Importa a conexão do banco de dados

// Teste uma consulta simples
db.query('SELECT * FROM sua_tabela', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query results:', results);
});

// Fechar a conexão quando terminar
db.end(err => {
    if (err) {
        console.error('Error closing the connection:', err);
    } else {
        console.log('Connection closed.');
    }
});