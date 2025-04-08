export default {
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  quoteProps: 'as-needed',
  useTabs: false,
  semi: false,
  trailingComma: 'all',
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'strict',
  overrides: [
    {
      files: '*.json',
      options: {
        trailingComma: 'none',
      },
    },
    {
      files: '*.{wxml,axml}',
      options: { parser: 'html' },
    },
    {
      files: '*.{wxss,acss}',
      options: { parser: 'css' },
    },
    // {
    //   files: '*.wxs',
    //   options: { parser: 'babel' },
    // },
  ],
}
