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
        return jwt.sign({ name: this.name }, SECRET);
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
    const receivedUser = await this.findOne({ where: { name } });
    if (receivedUser) { console.log('password received is ' + receivedUser.password) }
    else { console.error('user not found'); }
    const valid = await bcrypt.compare(password, receivedUser.password);
    if (valid) { return receivedUser; }
    else {
      throw new Error('Invalid User');
    }
  };

  model.authenticateToken = async function (token) {
    console.log('im before the catch block in model.authenticatetoken' + token);
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ where: { name: parsedToken.name } });
      if (user) { return user; }
    } catch (error) {
      console.error('there was a problem with authentication');
    }
  };

  return model;

}

module.exports = userModel


// sample user for signup

// {  "name": "name",
//    "pokemonArray": "",
//    "role": "role",
//    "email": "email@email.com",
//     "password": "password"   }