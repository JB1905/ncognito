module.exports = {
  // parser: 'eslint-plugin-vue',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'vue'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      module: true,
    },
  },
  rules: {
    'no-unused-vars': ['off'],
  },
};
