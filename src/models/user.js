'use strict';

const userModel = (sequelize, DataTypes) => sequelize.define('User', {
  name: { type: DataTypes.STRING, required: true },
  pokemonArray: { type: DataTypes.ARRAY, required: false },
  role: { type: DataTypes.ENUM('trainer', 'gymLeader', 'pokemonMaster'), required: true },
  email: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING, required: true }
});

module.exports = userModel;