'use strict';

const pokemonModel = (sequelize, DataTypes) => sequelize.define('Pokemon', {
  name: { type: DataTypes.STRING, required: true },
  type: { type: DataTypes.STRING, required: true },
  isLegendary: { type: DataTypes.BOOLEAN, required: true },
  isShiny: { type: DataTypes.BOOLEAN, required: true },
  isEvolved: { type: DataTypes.BOOLEAN, required: true },
});

module.exports = pokemonModel;