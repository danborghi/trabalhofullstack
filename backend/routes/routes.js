const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

// Rota para criar pessoa (POST)
router.post('/pessoa', pessoaController.createPessoa);

// Rota para listar todas as pessoas (GET) atenção ao S sao pessoas
router.get('/pessoas', pessoaController.getPessoas);

// Rota para atualizar uma pessoa (PUT)
router.put('/pessoa/:id', pessoaController.updatePessoa);

// Rota para deletar uma pessoa (DELETE)
router.delete('/pessoa/:id', pessoaController.deletePessoa);

module.exports = router;
