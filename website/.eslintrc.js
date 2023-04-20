// https://github.com/vercel/next.js/issues/40687
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules', 'dist'],
  // https://github.com/vercel/next.js/issues/40687
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
