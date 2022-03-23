import { Configuration } from 'webpack';
import { SupportFn } from '../type';

export const chunksSupport: SupportFn = () => {
  const conf: Configuration = {
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        cacheGroups: {
          libs: { name: '__libs', test: /[\\/]node_modules[\\/](@)?vue/, priority: -5 },
          vendors: { name: '__vendors', test: /[\\/]node_modules[\\/]/, priority: -10 },
          default: {
            name: '__',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          // vendors: {
          //   name: (module) => {
          //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          //     return `__${packageName.replace('@', '')}`;
          //   },
          //   test: /[\\/]node_modules[\\/]/,
          //   priority: -10
          // },
          styles: { name: 'styles', test: /\.css/, chunks: 'all', enforce: true, priority: -10 }
        }
      }
    }
  };
  return conf;
};
