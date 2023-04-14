'use strict';
require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET_STRING;

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('user', {
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
        return acl[this.role];
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  model.authenticateBasic = async function (name, password) {
    console.log('authenticateBasic function received user name: ' + name);
    console.log('authenticateBasic received user password: ' + password);
    const receivedUser = await this.findOne({ where: { name } });
    console.log(receivedUser);
    if ( receivedUser ) { console.log('password received is ' + receivedUser.password) }
    else { console.log('user not found'); }
    const valid = await bcrypt.compare(password, receivedUser.password);
    console.log('bcrypt says your password is: ' + valid);
    console.log(`user ${name} signed in`);
    if (valid) { return receivedUser; }
    else {
      throw new Error('Invalid User');
    }
  };

  return model;

}

module.exports = userModel



// { "name": "crypt", "pokemonArray": "", "role": "pokemonMaster", "email": "email@email.com", "password": "pass" }