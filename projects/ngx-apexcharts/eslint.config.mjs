// @ts-check
import tseslint from "typescript-eslint";
import rootConfig from "../../eslint.config.js";

export default tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "apx",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        [
          { type: "element", prefix: "apx", style: "kebab-case" },
          { type: "attribute", prefix: "apex", style: "camelCase" },
        ],
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
