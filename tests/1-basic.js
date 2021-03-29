'use strict';

const { test } = require('../index.js');

test('Named results')
  .passes(() => {
    const res = {};
    res.one = 0 - 1 + 2;
    res.two = 1 + 1 + 0;
    res.six = 1 + 2 + 3;
    return res;
  })
  .returns({
    one: 1,
    two: 2,
    six: 6
  });

test('Throw error to `passes`')
  .passes(() => {
    throw new Error('works as it should be');
  });

test('No error inside `fails`')
  .fails(() => {});

test('Return array, expect object')
  .passes(() => [])
  .returns({});

test('Return object, expect array')
  .passes(() => ({}))
  .returns([]);

test('Return object with no keys, expect object with no keys')
  .passes(() => ({}))
  .returns({});

test('No output, because no method is called');

test('Passed array as asserted error')
  .fails(() => {
    throw new Error('works as it should be');
  })
  .throws([]);
