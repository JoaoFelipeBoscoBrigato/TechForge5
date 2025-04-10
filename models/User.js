const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const { name, email, password, cpf } = userData;
        const sql = 'INSERT INTO users (name, email, password, cpf) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, password, cpf], callback);
    },
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    },
    update: (id, userData, callback) => {
        const { name, cpf } = userData;
        const sql = 'UPDATE users SET name = ?, cpf = ? WHERE id = ?';
        db.query(sql, [name, cpf, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    },
};

module.exports = User;