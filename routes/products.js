const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Criar um novo produto
router.post('/', auth, (req, res) => {
    const { name, price, description, stock } = req.body;
    const productData = { name, price, description, stock };

    Product.create(productData, (err) => {
        if (err) return res.status(500).json({ msg: 'Server error' });
        res.status(201).json({ msg: 'Product created successfully' });
    });
});

// Listar todos os produtos com paginação
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    Product.findAll(page, limit, (err, results) => {
        if (err) return res.status(500).json({ msg: 'Server error' });
        res.json(results);
    });
});

// Editar um produto
router.put('/:id', auth, (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    Product.update(id, productData, (err) => {
        if (err) return res.status(500).json({ msg: 'Server error' });
        res.json({ msg: 'Product updated successfully' });
    });
});

// Deletar um produto
router.delete('/:id', auth, (req, res) => {
    const { id } = req.params;

    Product.delete(id, (err) => {
        if (err) return res.status(500).json({ msg: 'Server error' });
        res.json({ msg: 'Product deleted successfully' });
    });
});

module.exports = router;
