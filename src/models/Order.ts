import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IOrder {
    id?: number;
    userId: number;
    total: number;
}

export class Order {
    // Método para criar um novo pedido
    static create(orderData: { userId: number; total: number; products: { productId: number; quantity: number; }[] }): Promise<void> {
        return new Promise((resolve, reject) => {
            const { userId, total, products } = orderData;

            // Inserir o pedido na tabela de pedidos
            const sql = 'INSERT INTO orders (user_id, total) VALUES (?, ?)';
            db.query(sql, [userId, total], (err, result: ResultSetHeader) => {
                if (err) return reject(err);

                const orderId = result.insertId; // ID do pedido recém-criado

                // Inserir os produtos do pedido na tabela de produtos do pedido
                const productSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)';
                const productPromises = products.map(product => {
                    return new Promise<void>((resolve, reject) => {
                        db.query(productSql, [orderId, product.productId, product.quantity], (err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });

                // Esperar que todos os produtos sejam inseridos
                Promise.all(productPromises)
                    .then(() => resolve())
                    .catch(err => reject(err));
            });
        });
    }

    // Método para buscar todos os pedidos de um usuário
    static findByUserId({ userId }: { userId: number; }): Promise<IOrder[]> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM orders WHERE user_id = ?';
            db.query(sql, [userId], (err, results: RowDataPacket[]) => {
                if (err) return reject(err);

                // Mapeando os resultados para IOrder
                const orders: IOrder[] = results.map(row => ({
                    id: row.id,
                    userId: row.user_id,
                    total: row.total,
                }));

                resolve(orders);
            });
        });
    }

    // Método para buscar um pedido pelo ID
    static findById(id: number): Promise<IOrder | null> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM orders WHERE id = ?';
            db.query(sql, [id], (err, results: RowDataPacket[]) => {
                if (err) return reject(err);
                const order = results[0] ? {
                    id: results[0].id,
                    userId: results[0].user_id,
                    total: results[0].total,
                } : null;
                resolve(order);
            });
        });
    }

    // Método para atualizar um pedido
    static update(id: number, orderData: Partial<IOrder>): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE orders SET total = ? WHERE id = ?';
            db.query(sql, [orderData.total, id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    // Método para deletar um pedido
    static delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM orders WHERE id = ?';
            db.query(sql, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}