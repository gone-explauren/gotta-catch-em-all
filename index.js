'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { sequelize } = require('./src/models/index.js');

sequelize.sync().then(() => {
  app.start(process.env.PORT || 3001);
});