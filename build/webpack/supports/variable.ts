import { DefinePlugin } from 'webpack';
import { SupportFn } from '../type';
export const variableSupport: SupportFn = (module, isBuild, env) => {
  return {
    plugins: [
      new DefinePlugin({
        GLOBAL_FILE_PATH: JSON.stringify(env.WEBPACK_FILE_SERVER),
        GLOBAL_VERSION: JSON.stringify(env.WEBPACK_VERSION),
        DEV: !isBuild
      })
    ]
  };
};
