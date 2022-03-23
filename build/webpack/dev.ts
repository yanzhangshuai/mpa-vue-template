import { Configuration } from 'webpack-dev-server';
import { Env } from '../type';
import { createProxy } from './proxy';
import { findPort, resolve } from '../utils';

function rewrites(module: Record<string, string>) {
  return Object.keys(module).map((key) => {
    return { from: new RegExp(`^\/${key}`), to: `/${key}/index.html` };
  });
}

export function createDevServer(module: Record<string, string>, env: Env): Promise<Configuration> {
  let open: boolean | Array<string> = false;

  if (env.WEBPACK_SERVER_OPEN) {
    open = Object.keys(module).map((key) => `${env.WEBPACK_SERVER_HTTPS ? 'https' : 'http'}://${env.WEBPACK_SERVER_HOST}:${env.WEBPACK_SERVER_PORT}/${key}`);
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

    watchFiles: {
      paths: resolve('src'),
      options: {
        usePolling: false,
        ignored: /node_modules/
      }
    },
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
