/* globals describe, it, tr */

var pluginTr = require('..');
var shell = require('shelljs'); // recommended

require('should');

// override console.error() to cover up common.error() calls
console.error = function () { };

describe('plugin-tr', function () {
  it('does not get added to the shelljs instance', function () {
    shell.should.not.have.property('tr');
  });

  it('does not override other commands or methods', function () {
    shell.cp.should.be.type('function');
    shell.mv.should.be.type('function');
    shell.ls().should.have.property('toEnd');
    shell.ls().should.have.property('grep');
    shell.ls().should.have.property('sed');
  });

  it('gets added as a ShellJS method', function () {
    shell.ls().should.have.property('tr');
  });

  it('exports the plugin implementation', function () {
    pluginTr.should.be.type('object');
    pluginTr.should.have.property('tr');
    pluginTr.tr.should.be.type('function');
  });

  // it('does not accept options/flags', function () {
  //   /*
  //    * Plugins are an easy way of specifying what options/flags your command
  //    * supports
  //    */
  //   var ret = shell.tr('-f', 'test');
  //   ret.code.should.equal(1);
  //   ret.stdout.should.equal('');
  //   var errorMsg = 'tr: option not recognized: f';
  //   ret.stderr.should.equal(errorMsg);
  //   shell.error().should.equal(errorMsg);
  // });

  it('supports basic usage', function () {
    (new shell.ShellString('message\n'))
      .tr('s', 'S').toString().should.equal('meSSage\n');
  });

  it('supports swapping characters', function () {
    (new shell.ShellString('message\n'))
      .tr('es', 'se').toString().should.equal('mseeags\n');
    (new shell.ShellString('message\n'))
      .tr('se', 'es').toString().should.equal('mseeags\n');
  });

  it('supports a shorter second set', function () {
    (new shell.ShellString('message\n'))
      .tr('sem', 'S').toString().should.equal('SSSSagS\n');
  });

  it('expands ranges', function () {
    (new shell.ShellString('message\n'))
      .tr('a-e', 'b-f').toString().should.equal('mfssbgf\n');
    (new shell.ShellString('message\n'))
      .tr('a-z', 'A-Z').toString().should.equal('MESSAGE\n');
    (new shell.ShellString('message\n'))
      .tr('a-a', 'z-z').toString().should.equal('messzge\n');
  });

  it('works with multiple ranges', function () {
    (new shell.ShellString('message\n'))
      .tr('a-z', 'n-za-m').toString().should.equal('zrffntr\n');
    (new shell.ShellString('Message\n'))
      .tr('a-zA-Z', 'n-za-mN-ZA-M').toString().should.equal('Zrffntr\n');
  });

  it('errors for invalid range', function () {
    var ret = (new shell.ShellString('message\n'))
      .tr('z-a', 'a-z');
    ret.code.should.equal(1);
    ret.stdout.should.equal('');
    ret.stderr.should.equal('tr: range-endpoints of z-a are in reverse order');
    shell.error().should.be.ok();
  });

  describe('options', function () {
    it('-d', function () {
      (new shell.ShellString('message\n'))
        .tr('-d', 'ms').toString().should.equal('eage\n');
      (new shell.ShellString('message\n'))
        .tr('-d', 'a-e').toString().should.equal('mssg\n');
    });

    it('-c', function () {
      (new shell.ShellString('message\n'))
        .tr('-dc', 'ms').toString().should.equal('mss\n');
      (new shell.ShellString('message\n'))
        .tr('-cd', 'a-e').toString().should.equal('eae\n');
    });

    it('-s', function () {
      (new shell.ShellString('message\n'))
        .tr('-s', 's', 'S').toString().should.equal('meSage\n');
      (new shell.ShellString('message\n'))
        .tr('-s', 'a', 'S').toString().should.equal('messSge\n');
      (new shell.ShellString('message\n'))
        .tr('-s', 'es', 'S').toString().should.equal('mSagS\n');
      (new shell.ShellString('message\n'))
        .tr('-s', 'es', 'SA').toString().should.equal('mSAagS\n');
    });
  });
});
