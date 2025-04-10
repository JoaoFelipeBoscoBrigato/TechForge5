const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // seu usuário do MySQL
    password: 'sua_senha', // sua senha do MySQL
    database: 'tshirt_store', // nome do seu banco de dados
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL connected');
});

module.exports = db;