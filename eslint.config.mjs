import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("plugin:@next/next/core-web-vitals"), // оборачиваем плагин Next
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];
