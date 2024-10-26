// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: ["app", "doc", ""],
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["app", "doc", ""],
          style: "kebab-case",
        },
      ],
      "@angular-eslint/directive-class-suffix": "warn",
      "@angular-eslint/component-class-suffix": "warn",
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
