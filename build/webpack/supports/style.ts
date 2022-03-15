import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { SupportFn } from '../type';
import { resolve } from '../../utils';
import { cssChunkFilename, cssFilename } from '../output';

export const styleSupport: SupportFn = (module, isBuild) => {
  const { loader } = MiniCssExtractPlugin;
  const styleConf: Configuration = {
    module: {
      rules: [
        { test: /\.css$/, use: [isBuild ? loader : 'style-loader', { loader: 'css-loader' }, 'postcss-loader'] },
        {
          test: /\.less$/,
          include: resolve('src'),
          use: [
            isBuild ? loader : 'style-loader',
            { loader: 'css-loader', options: { importLoaders: 2 } },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: { hack: [`true; @import (reference) "${resolve('src/asset/theme/default.less')}";`] },
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    },

    optimization: {
      minimizer: [new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    plugins: [],

    resolve: { extensions: ['.less', '.css'] }
  };

  isBuild && styleConf.plugins.push(new MiniCssExtractPlugin({ filename: cssFilename, chunkFilename: cssChunkFilename }));
  return styleConf;
};
