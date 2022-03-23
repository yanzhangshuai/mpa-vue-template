import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { SupportFn } from '../type';

export const htmlSupport: SupportFn = (module, isBuild, env) => {
  const plugins = Object.keys(module).map((key) => {
    return new HtmlWebpackPlugin({
      template: path.join(module[key], 'public/index.html'),
      filename: path.join(key, 'index.html'),
      chunks: [key], //引入的js
      title: `${env.WEBPACK_APP_TITLE ? env.WEBPACK_APP_TITLE + '_' : ''}` + key,
      publicPath: '/',
      inject: 'body',
      //  是否进行缓存，默认为true，在开发环境可以设置成false
      cache: isBuild,
      minify: isBuild
    });
  });

  return { plugins: plugins };
};
