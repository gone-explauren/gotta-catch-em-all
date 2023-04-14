'use strict';

const { sequelize, user } = require('./index.js');

try {
  beforeAll(async () => {
    await sequelize.sync();
  });

} catch (error) {
  console.log("ERROR: ", e)
}
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the user model', () => {
  test('user should be created', async () => {

    let newUser = await user.create({
      name: 'test',
      pokemonArray: '',
      role: 'trainer',
      email: 'test@gmail.com',
      password: 'test',
    });
    console.log('token of new user is ' + newUser.token)
    expect(newUser.token).toBeTruthy();
    expect(newUser.password).toBeTruthy();
  });

  test('can read all users', async () => {
    let allUsers = await user.model.findAll();
    console.log(allUsers);
    expect(allUsers.length > 0).toBeTruthy();
  });

  test('can read selected user', async () => {
    const id = 1;
    let selUser = await user.model.findByPk(id);
    console.log(selUser);
    expect(selUser.id).toEqual(1);
  });

  test('can update user', async () => {
    const id = 1;
    let updatedUser = {
      name: 'test',
      pokemonArray: '',
      role: 'trainer',
      email: 'updatedemail@gmail.com',
      password: 'test',
    };
    let updUser = await user.model.update(
      updatedUser,
      { where: { id: id } }
    );
    console.log('return from update is ' + updUser);
    expect(updUser).toEqual([1]);
    const userAfterUpdate = await user.model.findByPk(id);
    console.log(userAfterUpdate);
    expect(userAfterUpdate.email).toEqual('updatedemail@gmail.com');
  });


  test('can delete user', async () => {
    const id = 1;
    let deletedUser = await user.model.destroy( { where: { id: id } });
    console.log(deletedUser);
    expect(deletedUser).toEqual(1);
  });

})