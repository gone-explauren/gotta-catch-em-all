'use strict';



const base64 = require('base-64');
const { user } = require('../../models');

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);

  if (!req.headers.authorization) { 
    console.error('no auth headers');
    return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');
  // console.log(username);
  // console.log(password);

  try {

    req.user = await user.model.authenticateBasic(username, password)
    console.log(req.user);
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}