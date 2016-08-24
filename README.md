# shelljs-plugin-tr

[![Travis](https://img.shields.io/travis/nfischer/shelljs-plugin-tr/master.svg?style=flat-square&label=unix)](https://travis-ci.org/nfischer/shelljs-plugin-tr)
[![npm](https://img.shields.io/npm/v/shelljs-plugin-tr.svg?style=flat-square)](https://www.npmjs.com/package/shelljs-plugin-tr)

A [ShellJS](https://github.com/shelljs/shelljs) plugin for the `tr()` command.

## Installation

```bash
$ npm install --save shelljs
$ npm install --save shelljs-plugin-tr
```

## Usage

To use this plugin in your project, include it like so:

```javascript
var shell = require('shelljs');
require('shelljs-plugin-tr');

// Ex. usage:
new shell.ShellString('some string').tr('-dc', 'aeiou'); // oei
new shell.ShellString('message').tr('a-z', 'n-za-m'); // zrffntr
```

## Writing plugins

If you're interested in taking a look at the current state of the plugin API,
take a look at [index.js](index.js). This has helpful comments explaining the
necessary boilerplate for writing a plugin. For an example usage of the plugin,
take a look at [test/test.js](test/test.js).
