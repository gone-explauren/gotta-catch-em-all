class Collection {
  constructor(model) {
    this.model = model;
  }

  async read(id, options) {
    console.log(id)
    try {
      if (id) {
        return await this.model.findOne({ where: {id:id}, ...options});
      } else {
        return await this.model.findAll(options);
      }
    } catch (e) {
      console.log('COLLECTION CLASS READ ERROR', e);
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch(e) {
      console.log('COLLECTION CREATE ERROR', e);
    }
  }

  async update(id, data) {
    try {
      let updatedRecord = await this.model.update(
        data,
        {
          where: { id: id }
        });
      return updatedRecord;
    } catch (e) {
      console.log('COLLECTION UPDATE ERROR', e);
    }
  }

  async delete(id) {
    try {
      let number = await this.model.destroy({
        where: {
          id: id,
        }
      });
      return number;
    } catch(e) {
      console.log('COLLECTION DELETE ERROR: ', e);
    }
  }
}

module.exports = Collection;




// const  = require('');

// add the pokemon from the seed.js to this array? 
// pokemon.push(pokemon.name)
// const pokemon = [];

// function buildYourTeam(arr) {
//   const userTeam = [];

//   while (userTeam.length < 6) {
//     const choice = prompt(`Choose ${6 - choices.length} more Pokemon:\n${arr.filter(p => !choices.includes(p)).join('\n')}`);

//     if (!choice || !arr.includes(choice)) {
//       alert('Please choose a valid Pokemon!');
//     }

// 		if (user.role === 'trainer' && pokemon.status !== 'base') {
// 			alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
// 		}

// 		if (user.role === 'gymLeader' && pokemon.status === 'legendary') {
// 			alert('This Pokemon is too strong for your team! Please choose a different Pokemon.')
// 		}

//     else {
//       userTeam.push(choice);
//     }
//   }

//   return userTeam;
// }

// const userChoices = buildYourTeam(pokemon);
// console.log(userChoices); // Output the user's chosen 6 Pokémon
