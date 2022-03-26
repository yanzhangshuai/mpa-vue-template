import path from 'path';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { merge as webpackMerge } from 'webpack-merge';
import packageJson from './package.json';
import { Env } from './build/type/env';
import { loadEnv } from './build/util/config';
import { configPath, resolve } from './build/util/path';
import { getEntry, getModule, wrapperEnv } from './build/util/helper';
import { support } from './build/webpack/support';
import { createDevServer } from './build/webpack/dev';
import { chunkFilename, filename } from './build/webpack/output';

export default async (env: { WEBPACK_BUNDLE?: boolean; WEBPACK_BUILD?: boolean; WEBPACK_SERVE?: boolean; target?: string; t?: string }): Promise<Configuration> => {
  //  环境判断
  const isBuild = env.WEBPACK_BUILD;

  const mode = isBuild ? 'production' : 'development';

  // 本地执行的指定module
  const targetModule = !(env.target || env.t) ? null : (env.target || env.t).split(',');

  // 设置版本号
  process.env.GLOBAL_VERSION = packageJson.version;

  // 根据webpack命令设置NODE环境变量
  process.env.NODE_ENV = mode;

  const webpackEnv = wrapperEnv<Env>(loadEnv(mode, configPath));

  const module = getModule('/src/module', targetModule);

  webpackEnv.WEBPACK_SERVER_HOST = webpackEnv.WEBPACK_SERVER_HOST || 'localhost';

  const devServer = (!isBuild && (await createDevServer(module, webpackEnv))) || {};

  webpackEnv.WEBPACK_SERVER_PORT = Number(devServer.port) || webpackEnv.WEBPACK_SERVER_PORT;

  const baseConf: Configuration = {
    target: 'web',

    mode: mode,

    cache: typeof webpackEnv.WEBPACK_CATCH === 'boolean' ? webpackEnv.WEBPACK_CATCH : { type: webpackEnv.WEBPACK_CATCH },

    devtool: webpackEnv.WEBPACK_DEVTOOL,

    entry: getEntry(module, targetModule),

    output: {
      path: path.isAbsolute(webpackEnv.WEBPACK_OUTPUT_DIR) ? webpackEnv.WEBPACK_OUTPUT_DIR : resolve(webpackEnv.WEBPACK_OUTPUT_DIR),
      filename: filename,
      chunkFilename: chunkFilename,
      clean: true
    },

    devServer: devServer,

    optimization: {
      minimize: isBuild,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: webpackEnv.WEBPACK_BUILD_DROP_CONSOLE
            }
          }
        })
      ]
    },

    performance: { maxEntrypointSize: 400000, maxAssetSize: 400000 },

    resolve: {
      mainFiles: ['index', 'module'],
      alias: {
        '@': resolve('src'),
        ...module
      }
    }
  };

  return webpackMerge(baseConf, support(module, isBuild, webpackEnv));
};
