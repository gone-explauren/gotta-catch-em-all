'use strict';

const logger = require('./logger');

describe('Test logger middleware', () => {
  test('Should log request in console', () => {
    const request = {
      method: 'get',
      path: 'path'
    };
    const response = {};
    const next = jest.fn();

    logger(request, response, next);
    expect(request.method).toEqual('get');
  });
});
