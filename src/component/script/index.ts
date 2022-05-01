import path from 'path';
import helper from 'vue-component-helper';

const componentPath = path.join(__dirname, '../');

helper({
  globs: path.join(componentPath, 'modules/**/*.{vue,tsx}').replace(/\\/g, '/'),
  output: path.join(componentPath, 'shims-volar.d.ts').replace(/\\/g, '/'),
  prefixPath: './modules',
  tabWidth: 2,
  ignoreExt: ['tsx'],
  namingStyle: 'hyphen',
  semi: false,
  singleQuote: true
});
