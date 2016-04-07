icon-font
===

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]

> make icon-font from svgs


## Usage

```sh
  $ icon-font <input> [<output>]
```

## Options

```
  -f, --font-family  font name
```

## Examples

```sh
$ icon-font ./src/svg/*.svg ./output --font-family=fontname

created: /Users/baidu/icon-font/output/fontname.ttf
created: /Users/baidu/icon-font/output/fontname.json
created: /Users/baidu/icon-font/output/fontname.html
created: /Users/baidu/icon-font/output/fontname.css
created: /Users/baidu/icon-font/output/fontname.svg
created: /Users/baidu/icon-font/output/fontname.woff
created: /Users/baidu/icon-font/output/fontname.eot

all 7 files
```

## Related

- [fontmin](https://github.com/ecomfe/fontmin)
- [fontmin-dump](https://github.com/junmer/fontmin-dump)


[travis-url]: https://travis-ci.org/junmer/icon-font
[travis-image]: http://img.shields.io/travis/junmer/icon-font.svg
[downloads-image]: http://img.shields.io/npm/dm/icon-font.svg
[npm-url]: https://npmjs.org/package/icon-font
[npm-image]: http://img.shields.io/npm/v/icon-font.svg
[dep-url]: https://david-dm.org/junmer/icon-font
[dep-image]: http://img.shields.io/david/junmer/icon-font.svg
