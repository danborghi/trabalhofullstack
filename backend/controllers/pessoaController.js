const { Pessoa } = require('../models');

// criar nova
const createPessoa = async (req, res) => {
  const { nome, cpf, telefone } = req.body;
  try {
    const pessoa = await Pessoa.create({ nome, cpf, telefone });
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar pessoa', details: error });
  }
};

// listar
const getPessoas = async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar pessoas' });
  }
};

// atualizar
const updatePessoa = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone } = req.body;

  try {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    pessoa.nome = nome || pessoa.nome;
    pessoa.cpf = cpf || pessoa.cpf;
    pessoa.telefone = telefone || pessoa.telefone;

    await pessoa.save();
    res.json(pessoa);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar pessoa', details: error });
  }
};

// deletar
const deletePessoa = async (req, res) => {
  const { id } = req.params;

  try {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    await pessoa.destroy();
    res.json({ message: 'Pessoa deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar pessoa', details: error });
  }
};

module.exports = {
  createPessoa,
  getPessoas,
  updatePessoa,
  deletePessoa,
};
