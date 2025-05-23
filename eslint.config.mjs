import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/operator-linebreak': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/html-self-closing': 'off',
      'vue/quote-props': 'off',
      'vue/no-irregular-whitespace': 'off',
      'vue/prop-name-casing': 'off',
      'vue/html-indent': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/custom-event-name-casing': [2, 'kebab-case'],
    },
  },
  typescript: {
    overrides: {
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/no-unused-expressions': 'off',
    },
  },
  rules: {
    'no-var': 'error',
    'no-undef': 'off',
    'no-new': 'off',
    'no-param-reassign': 'error',
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    curly: ['off', 'all'],
    'unicorn/number-literal-case': 'off',
    'unused-imports/no-unused-vars': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'style/semi': 'off',
    'style/indent': 'off',
    'style/comma-dangle': 'off',
    'style/quote-props': 'off',
    'style/indent-binary-ops': 'off',
    'style/operator-linebreak': 'off',
    'style/arrow-parens': ['error', 'always'],
    'style/member-delimiter-style': 'off',
    'style/jsx-closing-tag-location': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
  ignores: [
    'libs',
    'static',
    '*.discard',
    'index.html',
    'node_modules',
    '{wx,my,swan,jd,ks,tt}components/**/*',
  ],
})
