import { Configuration } from 'webpack-dev-server';
import { Env } from '../type/env';
import { Module } from '../type/webpack';
import { createProxy } from './proxy';
import { findPort } from '../util/helper';

function rewrites(module: Module) {
  return Object.keys(module).map((key) => {
    return { from: new RegExp(`^\/${key}`), to: `/${key}/index.html` };
  });
}

export function createDevServer(module: Module, env: Env): Promise<Configuration> {
  let open: boolean | Array<string> = false;

  if (env.WEBPACK_SERVER_OPEN) {
    const protocol = env.WEBPACK_SERVER_HTTPS ? 'https' : 'http';
    open = Object.keys(module).map((key) => `${protocol}://${env.WEBPACK_SERVER_HOST}:${env.WEBPACK_SERVER_PORT}/${key}`);
  }

  const conf: Configuration = {
    port: env.WEBPACK_SERVER_PORT,
    open: open,
    host: env.WEBPACK_SERVER_HOST,
    compress: env.WEBPACK_SERVER_COMPRESS,
    hot: true,
    historyApiFallback: {
      rewrites: rewrites(module)
    },
    client: {
      overlay: true
    },

    static: {
      serveIndex: true
    },

    devMiddleware: {
      stats: env.WEBPACK_SERVER_STATS,
      writeToDisk: env.WEBPACK_SERVER_WRITE_TO_DIST
    },

    // watchFiles: {
    //   paths: ['src/**/*.png', 'public/**/*'],
    //   options: {
    //     usePolling: false,
    //     ignored: /node_modules/
    //   }
    // },
    proxy: createProxy(env.WEBPACK_SERVER_PROXY)
  };

  return new Promise((resolve) => {
    findPort(env.WEBPACK_SERVER_PORT)
      .then((port) => {
        conf.port = port;
        resolve(conf);
      })
      .catch(() => resolve(conf));
  });
}
