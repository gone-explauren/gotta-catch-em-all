'use strict';

const pokemonModel = (sequelize, DataTypes) => sequelize.define('Pokemon', {
  name: { type: DataTypes.STRING, required: true },
  primaryType: { type: DataTypes.STRING, required: true },
  secondaryType: { type: DataTypes.STRING, required: false },
  status: { type: DataTypes.ENUM('legendary', 'evolved', 'base'), required: true },
  statusCapabilities: {
    type: DataTypes.VIRTUAL,
    get() {
      const acl = {
        base: ['trainer', 'gymLeader', 'pokemonMaster'],
        evolved: ['gymLeader', 'pokemonMaster'],
        legendary: ['pokemonMaster']
      }
    }
  }
});

module.exports = pokemonModel;

