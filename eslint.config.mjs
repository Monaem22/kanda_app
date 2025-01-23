import globals from "globals";
import eslintPluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module", // Changed from "commonjs" to "module"
      globals: {
        ...globals.browser,
        process: true ,
        require: true, // Add require to the globals
        module: true, // Add module to the globals
        exports: true ,
        __dirname: true
      }
    }
  },
  eslintPluginJs.configs.recommended
];