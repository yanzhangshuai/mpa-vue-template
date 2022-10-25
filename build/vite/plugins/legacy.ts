import legacy from '@vitejs/plugin-legacy';

import type { PluginFn } from '../../type/vite';

export const legacyPlugin: PluginFn = () => {
  // TODO： 未判断
  return legacy({
    targets: ['chrome >= 49', 'ie >= 11'],
    // polyfills: ['es.promise.finally', 'es/map', 'es/set'],
    // modernPolyfills: ['es.promise.finally']
    additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // renderLegacyChunks: true,
    // polyfills: true
  });
};
