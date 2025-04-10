const db = require('../config/db');

const Product = {
    create: (productData, callback) => {
        const { name, price, description, stock } = productData;
        const sql = 'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, price, description, stock], callback);
    },
    findAll: (page, limit, callback) => {
        const offset = (page - 1) * limit;
        const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';
        db.query(sql, [limit, offset], callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.query(sql, [id], callback);
    },
    update: (id, productData, callback) => {
        const { name, price, description, stock } = productData;
        const sql = 'UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?';
        db.query(sql, [name, price, description, stock, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM products WHERE id = ?';
        db.query(sql, [id], callback);
    },
};

module.exports = Product;