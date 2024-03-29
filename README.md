# shelljs-plugin-tr

[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/nfischer/shelljs-plugin-tr/main.yml?style=flat-square&logo=github)](https://github.com/nfischer/shelljs-plugin-tr/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/v/shelljs-plugin-tr.svg?style=flat-square)](https://www.npmjs.com/package/shelljs-plugin-tr)
[![shelljs-plugin](https://img.shields.io/badge/shelljs-plugin-brightgreen.svg?style=flat-square)](https://github.com/shelljs/shelljs/wiki/Using-ShellJS-Plugins)

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
