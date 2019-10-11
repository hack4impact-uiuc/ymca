module.exports = {
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: "eslint:recommended",
  env: {
    amd: true,
    node: true,
    es6: true
  },
  rules: {
    "no-console": "off"
  }
};
