/**
 * voda
 * The lightweight testing library
 * npm package
 * Author: Dmytro Rekechynsky
 * MIT License
 * (c) 2021
 */

const { deepStrictEqual } = require('assert').strict;

// Prepared labels for output
const testLabel = '\x1b[1m\x1b[30m\x1b[47m TEST \x1b[0m';
const passLabel = '\x1b[1m\x1b[30m\x1b[42m PASS \x1b[0m';
const failLabel = '\x1b[1m\x1b[30m\x1b[41m FAIL \x1b[0m';

const wrapString = value => typeof value === 'string'
  ? `"${value}"`
  : value;

const compareObjects = (actual, expected) => {
  const checkedKeys = Object.keys(expected);
  for (const key of checkedKeys) {
    if (actual[key] === undefined) {
      throw new Error(`the actual object does not contain the key "${key}"`);
    }
    const aVal = actual[key];
    const eVal = expected[key];
    deepStrictEqual(aVal, eVal,
      `actual.${key}: ${wrapString(aVal)}, ` +
      `expected.${key}: ${wrapString(eVal)}`);
  }
}

/**
 * `returns` compares the actual value (actValue)
 * and expected value (expValue)
 */

const returns = (actValue, expValue) => {
  const aType = typeof actValue;
  const eType = typeof expValue;
  try {
    if (aType !== eType) {
      throw new Error(`type of actual: ${aType}, expected: ${eType}`);
    } else if (aType === 'object') {
      compareObjects(actValue, expValue);
    } else {
      deepStrictEqual(actValue, expValue,
        `actual: ${wrapString(actValue)}, ` +
        `expected: ${wrapString(expValue)}`);
    }
    console.log(passLabel, 'Result equals to expected.');
  } catch (e) {
    console.log(`${failLabel} Result is not what we expected:\n${e}`);
  }
};


/**
 * `throws` compares the actual error (actError)
 * and expected error (expError)
 */

const throws = (actError, expError) => {
  try {
    if (typeof expError !== 'object') {
      throw new Error('Expected error is not an object...');
    }
    compareObjects(actError, expError);
    console.log(passLabel, 'Actual error is what we expected.');
  } catch (e) {
    console.log(`${failLabel} Error is not what we expected:\n${e}`);
  }
};

/**
 * `passes` checks whether `testable` fails.
 * If it does not, the test passes.
 *
 * Returns the object with one method:
 * - returns (comparing the actual and expected results)
 *
 * If you need just to make sure the test does not
 * throw an exception, you can not to call `returns`.
 */

const passes = (testName, testable) => {};

/**
 * `fails` checks whether `testable` fails.
 * If it does, the test passes.
 *
 * Returns the object with one method:
 * - throws (comparing the actual and expected errors)
 *
 * If you need just to make sure the test
 * throws an exception, you can not to call `throws`.
 */

const fails = (testName, testable) => {};


/**
 * Entry point.
 *
 * Accepts the name of test, returns the object
 * with 2 methods:
 * - passes (the tested code should be correct)
 * - fails (the tested code should throw an error)
 */

const test = (testName) => ({
  passes: (testable) => passes(testName, testable),
  fails: (testable) => fails(testName, testable)
});