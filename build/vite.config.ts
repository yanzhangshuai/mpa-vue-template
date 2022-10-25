import { defineConfig } from 'vite';

import { version } from '../package.json';

import { createProxy } from './vite/proxy';
import { loadEnv, wrapperEnv } from './util/env';
import { createVitePlugins } from './vite/plugin';
import { getEntry, getModule } from './util/module';
import { tsconfigAlias } from './vite/tsconfig.alias';
import { configPath, resolve, root } from './util/path';
import { assetFileNames, chunkFileNames, entryFileNames } from './vite/output';

import type { Env } from './type/env';
import type { RollupOptions } from 'rollup';
import type { Mode, Module } from './type/vite';
import type { BuildOptions, CSSOptions, ConfigEnv, ServerOptions } from 'vite';

export const moduleDir = 'src/module';

export default defineConfig((conf: ConfigEnv) => {
  const mode = conf.mode as Mode;

  // 本地执行的指定module
  // TODO: 未支持target编辑
  let targetModule: Array<string>;
  // const targetModule = !(option.target || option.t) ? null : (option.target || option.t).split(',');

  // 设置版本号
  process.env.GLOBAL_APP_VERSION = version;

  // 根据webpack命令设置NODE环境变量
  process.env.NODE_ENV = mode;

  const env = loadEnv(mode, configPath);

  const viteEnv = wrapperEnv<Env>(env);

  const module = getModule(moduleDir, targetModule);

  viteEnv.VITE_SERVER_HOST = viteEnv.VITE_SERVER_HOST || 'localhost';

  viteEnv.VITE_SERVER_PORT = viteEnv.VITE_SERVER_PORT || 3100;

  return {
    base: viteEnv.VITE_PUBLIC_PATH || '/',
    root,

    envDir: configPath,

    envPrefix: 'GLOBAL',

    define: {
      __VUE_OPTIONS_API__: viteEnv.VITE_SUPPORT_VUE_OPTIONS_API
    },

    css: cssOptions(module, mode, viteEnv),

    plugins: createVitePlugins(module, mode, viteEnv),

    build: buildOptions(module, mode, viteEnv),

    server: serverOption(module, mode, viteEnv),

    resolve: {
      alias: tsconfigAlias(),
      extensions: ['.ts', '.tsx', '.json', '.jsx', '.mjs', '.js']
    }
  };
});

function cssOptions(_: Module, __: Mode, ___: Env): CSSOptions {
  const conf: CSSOptions = {
    postcss: resolve('/build/postcss.config.js'),
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: [`true; @import (reference) "${resolve('src/asset/theme/default.less')}";`]
        },
        javascriptEnabled: true
      }
    }
  };

  return conf;
}

function buildOptions(module: Module, mode: Mode, env: Env): BuildOptions {
  if (mode !== 'production')
    return undefined;

  const rollupOptions: unknown = {
    input: getEntry(module),
    output: {
      entryFileNames,
      chunkFileNames,
      // manualChunks,
      assetFileNames
    }
  } as RollupOptions;

  const conf: BuildOptions = {
    // target: env.VITE_BUILD_TARGET || 'es2015',
    sourcemap: env.VITE_BUILD_SOURCE_MAP || false,
    minify: env.VITE_BUILD_MINIFY || true,
    outDir: env.VITE_BUILD_OUTPUT_DIR,
    assetsDir: env.VITE_BUILD_ASSETS_DIR || 'assets',
    terserOptions: env.VITE_BUILD_MINIFY === 'terser' && {
      compress: {
        keep_infinity: true,
        drop_console: env.VITE_BUILD_DROP_CONSOLE
      }
    },

    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions
  };

  return conf;
}

function serverOption(module: Module, mode: Mode, env: Env): ServerOptions {
  if (mode !== 'development')
    return undefined;
  // let open: boolean | Array<string> = false;
  //
  // if (env.VITE_SERVER_PORT) {
  //   // open
  //   const protocol = env.VITE_SERVER_HTTPS ? 'https' : 'http';
  //   open = Object.keys(module).map(key => `${protocol}://${env.VITE_SERVER_HOST}:${env.VITE_SERVER_PORT}/${key}`);
  // }

  const conf = {
    open: false,
    host: env.VITE_SERVER_HOST,
    port: env.VITE_SERVER_PORT,
    hmr: true,
    https: env.VITE_SERVER_HTTPS || false,
    proxy: createProxy(env.VITE_SERVER_PROXY)
  };

  return conf;
}
