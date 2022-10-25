import { vuePlugin } from './plugins/vue';
import { cssPlugin } from './plugins/css';
import { mpaPlugin } from './plugins/mpa';
import { htmlPlugin } from './plugins/html';
import { notePlugin } from './plugins/notes';
import { reportPlugin } from './plugins/report';
import { legacyPlugin } from './plugins/legacy';
import { compressionPlugin } from './plugins/compression';

import type { Mode, Module, PluginFn } from '../type/vite';
import type { Env } from '../type/env';
import type { Plugin } from 'vite';

export function createVitePlugins(module: Module, mode: Mode, viteEnv: Env): Array<Plugin | Plugin[]> {
  const plugins: Array<PluginFn> = [vuePlugin, cssPlugin, legacyPlugin, mpaPlugin, htmlPlugin, compressionPlugin, reportPlugin, notePlugin];

  return plugins.map(plugin => plugin(module, mode, viteEnv));
}
