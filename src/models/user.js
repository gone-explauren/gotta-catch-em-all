'use strict';
require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET_STRING;

const userModel = (sequelize, DataTypes) => sequelize.define('user', {
  name: { type: DataTypes.STRING, required: true },
  pokemonArray: { type: DataTypes.TEXT, required: false },
  role: { type: DataTypes.ENUM('trainer', 'gymLeader', 'pokemonMaster'), required: true },
  email: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING, required: true },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({ username: this.username }, SECRET);
    }
  },
  capabilities: {
    type: DataTypes.VIRTUAL,
    get() {
      const acl = {
        trainer: ['read', 'update'],
        gymLeader: ['read', 'write', 'update'],
        pokemonMaster: ['read', 'write', 'update', 'delete']
      }
      return acl[this.role]
    }
  }
});

module.exports = userModel;


      // model.beforeCreate(async user => {
      //   user.password = await bcrypt.hash(user.password, 10);
      // });
      
