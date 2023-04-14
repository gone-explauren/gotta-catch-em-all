'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');

router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignin);
router.get('/users', bearerAuth, handleGetUsers);
router.get('/secret', bearerAuth, handleSecret);


const { user } = require('../models');

const permissions = require('./middleware/acl');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await user.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll();
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}


module.exports = router;