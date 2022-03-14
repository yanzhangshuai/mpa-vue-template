import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { SupportFn } from '../type';

export const reportSupport: SupportFn = (module, isBuild, env) => {
  if (!env?.WEBPACK_REPORT) return {};

  return { plugins: [new BundleAnalyzerPlugin({ analyzerPort: 3231 })] };
};
