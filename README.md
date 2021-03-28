# voda
The lightweight testing Node.JS library.
Nothing can be more simple.

## Philosophy

Unittests are short tests, that expect only the one result,
regardless of if it is a regular result, or an error.

`voda` is created to be small library with no dependencies,
that allows to create quick and simple tests.
The code is designed to provide necessary functionality
without hard-to-understand constructions and lots of
useless statements.

It provides enough flexibility to create several kinds
of tests.

## Origin of name

The most popular frameworks for unittesting in Node.JS
are `chai` (can be read as "Tea" in Russian)
and `mocha` (the drink, too).

Instead of providing lots of flavours and feeling, this
library provides minimum you need, just like water ("voda").

## Dependencies

* Node.JS engine
* npm

and nothing more.

## Usage

Quick example:

```javascript
test('It should return 5')
  .passes(() => 5)
  .returns(5);
```

More you can find inside `docs/voda-usage.md`.

## Installation

```bash
# Local installation
npm i voda

# Global installation
sudo npm i -g voda
```

## Contributors

* D_MENT (Dmytro Rekechynsky)
