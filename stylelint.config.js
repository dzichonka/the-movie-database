/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  rules: {
    'value-keyword-case': 'lower',
    'scss/at-rule-conditional-no-parentheses': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
  },
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
    '.vite/**/*',
    'coverage/**/*',
  ],
};
