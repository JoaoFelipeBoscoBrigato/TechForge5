import express from 'express';
import { Order } from '../models/Order';

const router = express.Router();

// Rota para criar um novo pedido
router.post('/', async (req, res) => {
    try {
        const orderData = req.body;
        await Order.create(orderData);
        res.status(201).send({ message: 'Pedido criado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao criar o pedido.' });
    }
});

// Rota para buscar todos os pedidos de um usuário
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const orders = await Order.findByUserId({ userId });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar pedidos.' });
    }
});

// Rota para buscar um pedido pelo ID
router.get('/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = await Order.findById(orderId);
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(404).send({ error: 'Pedido não encontrado.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar o pedido.' });
    }
});

// Rota para atualizar um pedido
router.put('/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        await Order.update(orderId, req.body);
        res.status(200).send({ message: 'Pedido atualizado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar o pedido.' });
    }
});

// Rota para deletar um pedido
router.delete('/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        await Order.delete(orderId);
        res.status(200).send({ message: 'Pedido deletado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao deletar o pedido.' });
    }
});

export default router;