const pluginSortImports = require('@trivago/prettier-plugin-sort-imports')
const pluginTailwindcss = require('prettier-plugin-tailwindcss')

const bothParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
}

/** @type {import("prettier").Plugin}  */
const mixedPlugin = {
  parsers: {
    typescript: bothParser,
  },
}

module.exports = {
  plugins: [mixedPlugin],
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 110,
  importOrder: [
    '^react',
    '^lodash/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/names/(.*)$',
    '^@/analytics/(.*)$',
    '^@/(.*)$',
    '^@/data/(.*)$',
    '^@/assets/(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
}
