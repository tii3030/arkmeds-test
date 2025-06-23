import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      "import/prefer-default-export": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]);
