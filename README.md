# env.macro

[![Build Status](https://travis-ci.org/stereobooster/env.macro.svg?branch=master)](https://travis-ci.org/stereobooster/env.macro) [![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

## Problem

Sometimes you need to use env variables in JS. For example, to pass API keys for third-party services, and sometimes you need those keys only in production, but not in developement and you want to have check that key was passed in production build.

We can solve this problem with macros easily.

## Basic usage

```js
import env from "env.macro";
const MY_VAR = e("MY_VAR");
```

Will be converted to (assuming `process.env.MY_VAR === "abc"`)

```js
const MY_VAR = "abc";
```

## Type checking and type conversion

```js
import env from "env.macro";

const MY_VAR = e("MY_VAR", x => {
  const result = parseInt(x, 10);
  if (isNaN(result)) {
    throw new Error("Integer expected");
  }
  return result;
});
```

## Credits

Code boilerpalte based on [pveyes/raw.macro](https://github.com/pveyes/raw.macro).

## License

MIT
