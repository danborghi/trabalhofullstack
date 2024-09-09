const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.use(express.json());

const pessoaRoutes = require('./routes/routes');
app.use('/', pessoaRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
