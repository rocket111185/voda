'use strict';

const { test } = require('../index.js');

test('Comparing matrices')
  .passes(() => [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ])
  .returns([
    [1, 2, 3],
    [4, 5, 6],
    [7, '8', 9]
  ]);

test('Return array, expect object')
  .passes(() => [])
  .returns({});

test('Return object, expect array')
  .passes(() => ({}))
  .returns([]);

test('Return object with no keys, expect object with no keys')
  .passes(() => ({}))
  .returns({});
