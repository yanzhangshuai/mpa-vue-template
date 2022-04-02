import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { resolve } from '../../util/path';
import { SupportFn } from '../../type/webpack';

export const reportSupport: SupportFn = (module, isBuild, env) => {
  const conf: Configuration = { plugins: [] };

  if (!env?.WEBPACK_REPORT) return conf;

  conf.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: resolve('report/libs/index.html') }));

  return conf;
};
