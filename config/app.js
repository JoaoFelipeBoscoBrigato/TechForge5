const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produtos');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/produtos', produtoRoutes);

// Inicia servidor
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});