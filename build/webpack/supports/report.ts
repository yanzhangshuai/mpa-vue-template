import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { resolve } from '../../util/path';
import { SupportFn } from '../../type/webpack';

export const reportSupport: SupportFn = (module, isBuild, env) => {
  if (!env?.WEBPACK_REPORT) return {};

  return { plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: resolve('report/depend/index.html') })] };
};
