'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');

const { user } = require('../models');

router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignin);

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

module.exports = router;