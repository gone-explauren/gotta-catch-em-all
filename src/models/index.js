'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./clothes/user.js');
const pokemonModel = require('./food/pokemon.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const pokemon = pokemonModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  user: new Collection(user),
  pokemon: new Collection(pokemon),
};