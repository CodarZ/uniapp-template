/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
  ],
  rules: {
    'block-no-empty': true,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'import-notation': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'recycle-item', 'view', 'block', 'text', 'scroll-view'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'declaration-property-value-no-unknown': null,
    'function-linear-gradient-no-nonstandard-direction': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-duplicate-selectors': null,
    'selector-class-pattern': null,
    'no-empty-source': null,
    'function-no-unknown': null,
    'keyframes-name-pattern': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'comment-no-empty': true,
  },
  ignoreFiles: ['index.html', 'public', 'static', 'libs'],
  ignorePatterns: ['*.{ts,tsx,js,jsx,discard}', '{wx,my,swan,jd,ks,tt}components/**/*'],
}
