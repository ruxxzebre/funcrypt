module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: ["prettier"],
  rules: {
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-new-require": "off",
    "new-cap": "off",
    "max-classes-per-file": "off",
  },
};
