const path = require("path");
const pluginTester = require("babel-plugin-tester");
const plugin = require("babel-plugin-macros");
const prettier = require("prettier");

process.env.MY_VAR = "abc";

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  formatResult(result) {
    return prettier.format(result, { trailingComma: "es5" });
  },
  tests: {
    "no usage": `import env from "../macro";`,
    "basic usage": `
      import env from "../macro";
      const MY_VAR = e("MY_VAR");
    `,
  },
});
