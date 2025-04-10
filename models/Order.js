const db = require('../config/db');

const Order = {
    create: (orderData, callback) => {
        const { userId, total } = orderData;
        const sql = 'INSERT INTO orders (user_id, total) VALUES (?, ?)';
        db.query(sql, [userId, total], (err, result) => {
            if (err) return callback(err);
            const orderId = result.insertId;
            const orderItems = orderData.products.map(product => [orderId, product.productId, product.quantity]);
            const sqlItems = 'INSERT INTO order_items (order_id, product_id            , quantity) VALUES ?';
            db.query(sqlItems, [orderItems], callback);
        });
    },
    findByUserId: (userId, callback) => {
        const sql = 'SELECT * FROM orders WHERE user_id = ?';
        db.query(sql, [userId], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT * FROM orders';
        db.query(sql, callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM orders WHERE id = ?';
        db.query(sql, [id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM orders WHERE id = ?';
        db.query(sql, [id], callback);
    },
};

module.exports = Order;