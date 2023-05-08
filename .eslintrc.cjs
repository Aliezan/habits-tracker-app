module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],

  ignorePatterns: ["tailwind.config.js"],

  rules: {
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-boolean-value": "off",

  },
};
