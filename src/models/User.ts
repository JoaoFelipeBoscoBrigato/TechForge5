import db from '../config/db';

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
}

export class User {
    static create(userData: IUser): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users (name, email, password, cpf) VALUES (?, ?, ?, ?)';
            db.query(sql, [userData.name, userData.email, userData.password, userData.cpf], (err: any) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    static findByEmail(email: string): Promise<IUser  | null> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.query(sql, [email], (err: any, results: any[]) => {
                if (err) reject(err);
                resolve(results[0] || null);
            });
        });
    }

    static findById(id: number): Promise<IUser  | null> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE id = ?';
            db.query(sql, [id], (err: any, results: any[]) => {
                if (err) reject(err);
                resolve(results[0] || null);
            });
        });
    }

    static update(id: number, userData: Partial<IUser >): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET name = ?, cpf = ? WHERE id = ?';
            db.query(sql, [userData.name, userData.cpf, id], (err: any) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    static delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM users WHERE id = ?';
            db.query(sql, [id], (err: any) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}