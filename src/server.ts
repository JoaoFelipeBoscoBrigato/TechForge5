import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});