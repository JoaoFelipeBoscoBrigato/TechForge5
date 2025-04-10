const produtoModel = require('../models/Produto');

exports.listarProdutos = (req, res) => {
  try {
    const produtos = produtoModel.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarProduto = (req, res) => {
  try {
    const produto = produtoModel.findById(Number(req.params.id));
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};