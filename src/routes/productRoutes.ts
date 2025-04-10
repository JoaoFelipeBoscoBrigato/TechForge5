import express from 'express';
import { Product } from '../models/Product';
import { Router } from 'express';

const router = express.Router();

// Rota para criar um novo produto



// Rota para buscar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll(1, 10); // Passando 1 para a página e 10 para o limite
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar produtos.' });
    }
});

// Rota para buscar um produto pelo ID
router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await Product.findById(productId);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar o produto.' });
    }
});

// Rota para atualizar um produto
router.put('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        await Product.update(productId, req.body);
        res.status(200).send({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar o produto.' });
    }
});

// Rota para deletar um produto
router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        await Product.delete(productId);
        res.status(200).send({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao deletar o produto.' });
    }
});

export default router;