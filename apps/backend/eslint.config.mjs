// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended, // ✅ Use built-in recommended rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // ✅ Enables process, require, etc.
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
]);
