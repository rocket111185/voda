# voda usage

The exported function is `test`.

Wait... that's all???


Yes. And this is enough.

## How to include

```javascript
// ES6
const { test } = require('voda');
```

## test

`test` has one argument, the name of test.

Returns the object, which has 2 methods:

* passes
* fails

`test` does not provide any output, so

```javascript
test('test example');
```

outputs nothing.

## passes

`passes` has one argument, and this is a callback
with no arguments.

But how to test the functions which have arguments?

Lemme show you:

```javascript
'use strict';

const { test } = require('voda');
const sum = (a, b, c) => a + b + c;

test('sum of 3 numbers')
  .passes(() => sum(1, 2, 3));
```

As you can see, the construction is
`() => someFunction(...arguments)`.

But it does not work as you intended. It just outputs

```
|TEST| sum of 3 numbers
|PASS| The test does not cause an error.
```

Well... it works as it should be. `passes` just confirms
the passed function does not throw an error.
Otherwise, it will print the message of failure and the
error stacktrace.

But it returns the object with one method, `returns`.

### returns

`returns` has one argument, expected result.

```javascript
'use strict';

const { test } = require('voda');
const sum = (a, b, c) => a + b + c;

test('sum of 3 numbers')
  .passes(() => sum(1, 2, 3))
  .returns(6);
```

The output is just what we need:

```
|TEST| sum of 3 numbers
|PASS| The test does not cause an error.
|PASS| Result equals to expected.
```

The comparison is based on `deepStrictEqual` from the
standard module `assert`, so you can check even the matrices.

But what if we compare two objects?

```javascript
'use strict';

const { test } = require('voda');
const obj = {
  a: 1,
  b: 2,
  c: 3
};

test('sum of 3 numbers')
  .passes(() => obj)
  .returns({
    c: 3
  });
```

The test is passed, but the expected object is less than
the actual.

That's because only the keys of expected object are taken
for the comparison. So we can describe only the part of object
in order to check the result.

Also in order to have the `returns` test passed, the actual
and expected value should have the same type.

### Some tricks

```javascript
// Multiple lines
test('multiple lines')
  .passes(() => {
    console.log('Wow');
    console.log('It');
    console.log('Works');
  });

// Multiple results
test('several sum calls')
  .passes(() => {
    const res = [];
    res.push(sum(1, 2, 3));
    res.push(sum(1, 2, 4));
    res.push(sum(1, 2, 5));
    res.push(sum(2, 2, 3));
    res.push(sum(2, 3, 1));
    return res;
  })
  .returns([6, 7, 8, 7, 6]);
```

OK, now we know how to check the result.

But how to check an error?

## fails

`fails` has one argument, and this is a callback
with no arguments.

`fails` passes, if the callback throws an error:

```javascript
test('error test')
  .fails(() => {
    throw new Error('Fine')
  });
```

Also we can check the error itself, with `throws`.

### throws

`throws` is a method of the object, returned by `fails`.
The argument is the object with the checked Error properties.

Visit [this link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
for more information.

Remember, only the properties of the expected object
are checked.

```javascript
test('error test with properties checking')
  .fails(() => {
    throw new Error('Fine')
  })
  .throws({
    name: 'Error',
    message: 'Fine'
  });
```

## Summary

`voda` provides minimal, but powerful interface for testing.

I hope you'll find it useful.
