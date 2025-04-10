
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Finalizar compra
router.post('/', async (req, res) => {
    const { cliente_id, itens } = req.body;
    
    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Criar pedido
        const [pedido] = await connection.execute(
            'INSERT INTO pedidos (cliente_id, total) VALUES (?, ?)',
            [cliente_id, calcularTotal(itens)]
        );

        // 2. Adicionar itens
        for (const item of itens) {
            await connection.execute(
                'INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
                [pedido.insertId, item.produto_id, item.quantidade, item.preco]
            );
            
            // 3. Atualizar estoque
            await connection.execute(
                'UPDATE produtos SET estoque = estoque - ? WHERE id = ?',
                [item.quantidade, item.produto_id]
            );
        }

        await connection.commit();
        res.status(201).json({ pedido_id: pedido.insertId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: 'Erro ao processar pedido' });
    }
});

function calcularTotal(itens) {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

export default router;