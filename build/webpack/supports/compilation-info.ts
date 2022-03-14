import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { SupportFn } from '../type';

export const compilationInfoSupport: SupportFn = (module, isBuild, env) => {
  const messages = [];

  if (!isBuild) {
    messages.push(...Object.keys(module).map((key) => `http://${env.WEBPACK_SERVER_HOST}:${env.WEBPACK_SERVER_PORT}/${key}`));
  }

  return {
    plugins: [new FriendlyErrorsWebpackPlugin({ compilationSuccessInfo: { messages: messages, notes: [] } })]
  };
};
