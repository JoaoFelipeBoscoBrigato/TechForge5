
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'loja_camisas'
});

module.exports = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM produtos');
    return rows;
  }
};