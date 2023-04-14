'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.js');
const pokemonModel = require('./pokemon.js');
const Collection = require('./collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const pokemon = pokemonModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

module.exports = {
  sequelize: sequelize,
  user: new Collection(user),
  pokemon: new Collection(pokemon)
};