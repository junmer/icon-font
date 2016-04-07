#!/usr/bin/env node

/**
 * @file make iconfont from svgs
 * @author junmer
 */

import fs from 'fs';
import Fontmin from 'fontmin';
import dump from 'fontmin-dump';
import meow from 'meow';
import extend from 'xtend';

let log = msg => {
    process.stdout.write(msg + '\n');
};

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
    log(help);
    process.exit(1);
}

// fontmin options
let fmOpts = extend({fontFamily: 'iconfont'}, cli.flags);

// src
let src = cli.input;

// dest
let dest;

let isFile = path => {

    if (/^[^\s]+\.\w*$/.test(path)) {
        return true;
    }

    try {
        return fs.statSync(path).isFile();
    }
    catch (err) {
        return false;
    }
};

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
    .use(dump(fmOpts))
    .dest(dest || 'output')
    .run((err, files, stream) => {

        if (err) {
            log(err);
            process.exit(1);
        }

        files.forEach(file => {
            log(`created: ${file.path}`);
        });

        log(`\nall ${files.length} files`);

    });
