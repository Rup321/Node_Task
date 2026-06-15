import js from "@eslint/js";
import { node } from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],

    plugins: {
      js,
      prettier: prettierPlugin,
    },

    extends: ["js/recommended", prettierConfig],

    languageOptions: {
      globals: node,
      sourceType: "commonjs",
    },

    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // Code quality
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      "no-empty-function": "warn",
      "no-return-await": "error",
      "no-useless-return": "error",
      "no-constant-condition": "warn",
      "no-undef": "error",
      "no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: true,
          variables: true,
        },
      ],

      // Maintainable code
      // 'max-lines-per-function': ['warn', 60],
    },
  },
]);
