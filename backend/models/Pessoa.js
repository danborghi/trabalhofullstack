'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100] // valida que o nome tenha entre 3 e 100 caracteres
      }
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ // valida o formato do CPF
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^\(\d{2}\) \d{4,5}\-\d{4}$/ // valida o formato do telefone
      }
    }
  }, {
    tableName: 'Pessoas',
    timestamps: true, // add createdAt e updatedAt automaticamente
  });

  return Pessoa;
};
