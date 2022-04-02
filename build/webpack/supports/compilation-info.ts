import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { SupportFn } from '../../type/webpack';

export const compilationInfoSupport: SupportFn = (module, mode, env) => {
  const messages = [];

  if (mode === 'development') {
    const protocol = env.WEBPACK_SERVER_HTTPS ? 'https' : 'http';
    messages.push(...Object.keys(module).map((key) => `${protocol}://${env.WEBPACK_SERVER_HOST}:${env.WEBPACK_SERVER_PORT}/${key}`));
  }

  return {
    plugins: [new FriendlyErrorsWebpackPlugin({ compilationSuccessInfo: { messages: messages, notes: [] } })]
  };
};
