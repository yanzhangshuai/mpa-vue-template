import path from 'path';
import type { WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { SupportFn } from '../../type/webpack';

export const htmlSupport: SupportFn = (module, mode, env) => {
  const plugins: Array<WebpackPluginInstance> = Object.keys(module).map((key) => {
    return new HtmlWebpackPlugin({
      template: path.join(module[key], 'public/index.html'),
      filename: path.join(key, 'index.html'),
      chunks: [key], // 引入的js
      title: `${env.WEBPACK_APP_TITLE ? `${env.WEBPACK_APP_TITLE}_` : ''}${key}`,
      publicPath: '/',
      inject: 'body',
      cache: mode === 'production',
      minify: mode === 'production'
    });
  });

  return { plugins };
};
