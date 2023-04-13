'use strict';

function logger (request, response, next) {
  // log request
  let method = request.method;
  let path = request.path;
  console.log(`request received: ${method}, ${path}`);
  next();
}

module.exports = logger;
