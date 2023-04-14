'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');

const { user } = require('../models');
const pokemonArray = require('../../seed')

router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignin);
router.put('/buildYourTeam', buildYourTeam);

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

async function buildYourTeam(pokemonArray) {
	let userRecord = await user.create(req.body);

	const userTeam = [];

	while (userTeam.length < 6) {
		const choices = pokemonArray.filter(p => !userTeam.includes(p));
		const choice = prompt(`Choose ${6 - userTeam.length} more Pokemon:\n${choices.join('\n')}`);

		if (!choice || !choices.includes(choice)) {
			alert('Please choose a valid Pokemon!');
		} else {
			const pokemon = arr.find(p => p.name === choice);

			if (userRecord.role === 'trainer' && pokemon.status !== 'base') {
				alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
			} else if (user.role === 'gymLeader' && pokemon.status === 'legendary') {
				alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
			} else {
				userTeam.push(choice);
			}
		}
		return userTeam;
	}
	const userChoices = buildYourTeam(pokemon);
	console.log(userChoices); // Output the user's chosen 6 Pokémon

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
}

module.exports = router;