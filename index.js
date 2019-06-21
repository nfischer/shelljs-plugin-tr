var plugin = require('shelljs/plugin');

var lower = 'abcdefghijklmnopqrstuvwxyz';
var upper = lower.toUpperCase();
var alphabet = lower + upper + '0123456789';

function expandSet(range) {
  var first = alphabet.indexOf(range[0]);
  var last = alphabet.indexOf(range[2]) + 1;

  if (first > last) {
    plugin.error('range-endpoints of ' + range + ' are in reverse order');
  }

  var ret = alphabet.slice(first, last);
  return ret;
}
exports.expandSet = expandSet;

function getChar(str, idx) {
  if (idx < str.length) {
    return str[idx];
  }
  return str[str.length - 1];
}

function complement(set) {
  return alphabet.split('').filter(function (char) {
    return set.indexOf(char) === -1;
  }).join('');
}

function tr(opts, set1, set2) {
  var pipe = plugin.readFromPipe();
  set1 = set1.replace(/.-./g, expandSet);

  if (opts.complement) {
    set1 = complement(set1);
  }

  if (opts.delete) {
    return pipe.split('').filter(function (char) {
      return set1.indexOf(char) === -1;
    }).join('');
  } else if (set2) {
    set2 = set2.replace(/.-./g, expandSet);
    if (opts.complement) set2 = complement(set2);

    // build a map
    var map = {};
    for (var k = 0; k < set1.length; k++) {
      map[set1[k]] = getChar(set2, k);
    }

    // replace each character in the string
    var lastChar;
    return pipe.split('').map(function (char) {
      if (opts.squeeze && map[char] === lastChar && map[char]) {
        // If we already returned an 'S', and we're returning an 'S' this time,
        // don't return anything
        return '';
      }
      lastChar = map[char];
      return map[char] || char;
    }).join('');
  }
  plugin.error('unknown condition');
  return ''; // this is never reached
}

plugin.register('tr', tr, {
  allowGlobbing: false,
  pipeOnly: true,
  cmdOptions: {
    d: 'delete',
    c: 'complement',
    s: 'squeeze',
  },
});
exports.tr = tr;
