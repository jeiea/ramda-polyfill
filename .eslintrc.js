module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
  },
  "rules": {
    "no-console": 0,
    "no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
