const  = require('');

// add the pokemon from the seed.js to this array? 
// pokemon.push(pokemon.name)
const pokemon = [];

function buildYourTeam(arr) {
  const userTeam = [];

  while (userTeam.length < 6) {
    const choice = prompt(`Choose ${6 - choices.length} more Pokemon:\n${arr.filter(p => !choices.includes(p)).join('\n')}`);

    if (!choice || !arr.includes(choice)) {
      alert('Please choose a valid Pokemon!');
    }

		if (user.role === 'trainer' && pokemon.status !== 'base') {
			alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
		}

		if (user.role === 'gymLeader' && pokemon.status === 'legendary') {
			alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
		}

    else {
      userTeam.push(choice);
    }
  }

  return userTeam;
}

const userChoices = buildYourTeam(pokemon);

console.log(userChoices); // Output the user's chosen 6 Pokémon