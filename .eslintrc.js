module.exports = {
    root: true,
    extends: ["@open-wc/eslint-config", "prettier"],
    rules: {
      indent: "off",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "no-console": "off",
      "operator-linebreak": "off",
      "arrow-parens": "off",
      "implicit-arrow-linebreak": "off",
      "function-paren-newline": "off",
    },
    ignorePatterns: [
      "dist/**/*",
      "docs/**/*",
      "**/dist/*",
      "_monolith/*",
      "config/*",
      "pages/content/*",
      "pages/_includes/*",
      "src/assets/*",
      "node_modules/*",
      "test/*",
      "src/components/scrollable-card/src/js",
      "**/*.min.js",
      "**/node_modules/*",
      "src/components/charts/cannabis-local-ordinances/build",
      "!.eleventy.js"
    ],
    parserOptions: {
      allowImportExportEverywhere: true,
      ecmaVersion: 2021,
    },
    env: {
      es2021: true,
    },
    plugins: ["html"]
};
