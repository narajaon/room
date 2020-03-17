const warnOnDev = process.env.NODE_ENV === 'production' ? 'error' : 'off';

module.exports = {
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parser": "babel-eslint",
  "plugins": ["prettier"],
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "prettier/prettier": "warn",
    "no-bitwise": ["error", { "allow": ["<<", "|"] }],
    "indent": [
      "warn",
      2
    ],
    "no-unused-vars": ["warn", { "vars": "all" }],
    "quotes": [
      "error",
      "single"
    ],
    "no-shadow": ["error", {
      "builtinGlobals": false,
      "hoist": "functions",
    }],
    "no-param-reassign": ["error", {
      "props": true,
    }],
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": true
    }],
    "eqeqeq": ["error", "smart"],
    "consistent-return": ["warn"],
    "prefer-destructuring": ["error", {
      "object": true,
      "array": false
    }],
    "import/no-extraneous-dependencies": ["off"],
    "no-console": warnOnDev,
    "no-debugger": warnOnDev,
    "newline-before-return": ["warn"],
  }
};