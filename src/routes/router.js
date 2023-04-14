'use strict';

const express = require('express');
const dataModules = require('../models');
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

router.get('/:model', permissions('read'), handleGetAll);
router.get('/:model/:id', permissions('read'), handleGetOne);
router.post('/:model', permissions('create'), handleCreate);
router.put('/:model/:id', permissions('update'), handleUpdate);
router.delete('/:model/:id', permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res, next) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
	next(buildYourTeam);
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
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;