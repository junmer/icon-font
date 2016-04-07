#!/usr/bin/env node


/**
 * @file make iconfont from svgs
 * @author junmer
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fontmin = require('fontmin');

var _fontmin2 = _interopRequireDefault(_fontmin);

var _fontminDump = require('fontmin-dump');

var _fontminDump2 = _interopRequireDefault(_fontminDump);

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var log = function log(msg) {
    process.stdout.write(msg + '\n');
};

/**
 * help
 *
 * @type {string}
 */
var help = '\n    Usage\n      $ icon-font <input> [<output>]\n\n    Options\n      -f, --font-family  font name\n\n    Examples\n      $ icon-font ./src/svg/*.svg ./dest/iconfont --font-family=fontname\n\n';

// parse argv
var cli = (0, _meow2['default'])(help, {
    string: ['font-family'],
    alias: {
        f: 'font-family'
    }
});

// input empty
if (!cli.input.length) {
    log(help);
    process.exit(1);
}

// fontmin options
var fmOpts = (0, _xtend2['default'])({ fontFamily: 'iconfont' }, cli.flags);

// src
var src = cli.input;

// dest
var dest = undefined;

var isFile = function isFile(path) {

    if (/^[^\s]+\.\w*$/.test(path)) {
        return true;
    }

    try {
        return _fs2['default'].statSync(path).isFile();
    } catch (err) {
        return false;
    }
};

if (src.length > 1 && !isFile(src[src.length - 1])) {
    dest = src[src.length - 1];
    src.pop();
}

// start fontmin
new _fontmin2['default']().src(src).use(_fontmin2['default'].svgs2ttf(fmOpts.fontFamily, fmOpts)).use(_fontmin2['default'].ttf2eot(fmOpts)).use(_fontmin2['default'].ttf2woff(fmOpts)).use(_fontmin2['default'].ttf2svg(fmOpts)).use(_fontmin2['default'].css(fmOpts)).use((0, _fontminDump2['default'])(fmOpts)).dest(dest || 'output').run(function (err, files, stream) {

    if (err) {
        log(err);
        process.exit(1);
    }

    files.forEach(function (file) {
        log('created: ' + file.path);
    });

    log('\nall ' + files.length + ' files');
});

