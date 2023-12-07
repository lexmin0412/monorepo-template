'use strict';

const pkg2 = require('..');
const assert = require('assert').strict;

assert.strictEqual(pkg2(), 'Hello from pkg2');
console.info('pkg2 tests passed');
