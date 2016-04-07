#!/usr/bin/env node

/**
 * @file make iconfont from svgs
 */

'use strict';

const meow = require('meow');
const Fontmin = require('fontmin');
const extend = require('xtend');

/**
 * help
 *
 * @type {string}
 */
const help = `
    Usage
      $ icon-font <input> [<output>]

    Options
      -f, --font-family  font name

    Examples
      $ icon-font ./src/svg/\*.svg ./dest/iconfont --font-family=fontname

`;

// parse argv
const cli = meow(help, {
    string: [
        'font-family'
    ],
    alias: {
        f: 'font-family'
    }
});


// input empty
if (!cli.input.length) {
    console.error(help);
    process.exit(1);
}

// fontmin options
var fmOpts = extend({fontFamily: 'iconfont'}, cli.flags);

// src
var src = cli.input;

// dest
var dest;

function isFile(path) {
    if (/^[^\s]+\.\w*$/.test(path)) {
        return true;
    }

    try {
        return fs.statSync(path).isFile();
    }
    catch (err) {
        return false;
    }
}

if (src.length > 1 && !isFile(src[src.length - 1])) {
    dest = src[src.length - 1];
    src.pop();
}

// start fontmin
new Fontmin()
    .src(src)
    .use(Fontmin.svgs2ttf(fmOpts.fontFamily, fmOpts))
    .use(Fontmin.ttf2eot(fmOpts))
    .use(Fontmin.ttf2woff(fmOpts))
    .use(Fontmin.ttf2svg(fmOpts))
    .use(Fontmin.css(fmOpts))
    // .use(Fontmin.iconfont(fmOpts))
    .dest(dest || 'output')
    .run(function (err, files, stream) {

        if (err) {
            console.error(err);
            process.exit(1);
        }

        files.forEach(function (file) {
            console.log(`created: ${file.path}`);
        });

        console.log(`\nall ${files.length} files`);

    });
