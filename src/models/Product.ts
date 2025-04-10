import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IProduct {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
}

export class Product {
    // Método para criar um novo produto
    static create(productData: IProduct): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)';
            db.query(sql, [productData.name, productData.price, productData.description, productData.stock], (err: any, result: ResultSetHeader) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    // Método para buscar todos os produtos com paginação
    static findAll(page: number, limit: number): Promise<IProduct[]> {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;
            const sql = 'SELECT * FROM products LIMIT ?, ?';
            db.query(sql, [offset, limit], (err, results: RowDataPacket[]) => {
                if (err) return reject(err);
                const products: IProduct[] = results.map(row => ({
                    id: row.id,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    stock: row.stock,
                }));
                resolve(products);
            });
        });
    }

    // Método para buscar um produto pelo ID
    static findById(id: number): Promise<IProduct | null> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM products WHERE id = ?';
            db.query(sql, [id], (err, results: RowDataPacket[]) => {
                if (err) return reject(err);
                const product = results[0] ? {
                    id: results[0].id,
                    name: results[0].name,
                    price: results[0].price,
                    description: results[0].description,
                    stock: results[0].stock,
                } : null;
                resolve(product);
            });
        });
    }

    // Método para atualizar um produto
    static update(id: number, productData: Partial<IProduct>): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?';
            db.query(sql, [productData.name, productData.price, productData.description, productData.stock, id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    // Método para deletar um produto
    static delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM products WHERE id = ?';
            db.query(sql, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}