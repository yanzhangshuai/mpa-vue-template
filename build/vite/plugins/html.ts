import { createHtmlPlugin } from '@orca-studio/vite-plugin-html';

import type { PluginFn } from '../../type/vite';

export const htmlPlugin: PluginFn = (module) => {
  const pages = Object.keys(module).map((moduleName) => {
    return {
      template: `src/module/${moduleName}/index.html`,
      entry: `/src/module/${moduleName}/main.ts`,
      filename: `${moduleName}/index.html`
    };
  });

  return createHtmlPlugin({ pages }) as Plugin[];
};
