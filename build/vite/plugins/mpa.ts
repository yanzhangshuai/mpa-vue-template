import mpa from 'vite-plugin-mpa';

import type { PluginFn } from '../../type/vite';

export const mpaPlugin: PluginFn = () => {
  return mpa({ open: false, scanDir: 'src/module' });
};
