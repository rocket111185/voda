'use strict';

const { test } = require('../index.js');

test('No output, because no method is called');

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

test('Return 5, expect 5')
  .passes(() => 5)
  .returns(5);

test('Return "5", expect 5')
  .passes(() => '5')
  .returns(5);

test('Return 5, expect "5"')
  .passes(() => 5)
  .returns('5');

test('Throw error to `passes`')
  .passes(() => {
    throw new Error('works as it should be');
  });

test('No error inside `fails`')
  .fails(() => {});

test('Passed array as expected error')
  .fails(() => {
    throw new Error('works as it should be');
  })
  .throws([]);

test('Return "lola", expect "lol"')
  .passes(() => 'lola')
  .returns('lol');
