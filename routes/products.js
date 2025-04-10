const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// GET /api/produtos
router.get('/', produtoController.listarProdutos);

// GET /api/produtos/:id
router.get('/:id', produtoController.buscarProduto);

module.exports = router;