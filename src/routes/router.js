'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../auth/middleware/bearer');
const permissions = require('../auth/middleware/acl');
const pokemonArray = require('../../seed')

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearerAuth, permissions('read'), handleGetAll);
router.get('/:model/:id', bearerAuth, permissions('read'), handleGetOne);
router.post('/:model', bearerAuth, permissions('write'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  try {
    const allRecords = await req.model.read();
    res.status(200).json(allRecords);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.read(id);
    res.status(200).json(theRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
		next(buildYourTeam());
  } catch (error) {
    console.error(error);
    next(error);
  }
}

function buildYourTeam(arr) {
  const userTeam = [];

  while (userTeam.length < 6) {
    const choices = pokemonArray.filter(p => !userTeam.includes(p));
    const choice = prompt(`Choose ${6 - userTeam.length} more Pokemon:\n${choices.join('\n')}`);

    if (!choice || !choices.includes(choice)) {
      alert('Please choose a valid Pokemon!');
		} else {
      const pokemon = arr.find(p => p.name === choice);

		if (user.role === 'trainer' && pokemon.status !== 'base') {
			alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
		}else if (user.role === 'gymLeader' && pokemon.status === 'legendary') {
			alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
		} else {
      userTeam.push(choice);
    }
  }
  return userTeam;
}
const userChoices = buildYourTeam(pokemon);
console.log(userChoices); // Output the user's chosen 6 Pokémon


async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

}

module.exports = router;