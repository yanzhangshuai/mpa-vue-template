import type { App } from 'vue';

import { dateFormat } from '@/util/date';

import type { GlobalProps } from './type';

let globalProps: GlobalProps;

export function setupGlobalProperty(app: App<Element>): App<Element> {
  const env = import.meta.env;

  globalProps = {
    APP_NAME: env.GLOBAL_APP_NAME,
    APP_LOGO: env.GLOBAL_APP_LOGO,
    APP_VERSION: env.GLOBAL_APP_VERSION,
    APP_TITLE: env.GLOBAL_APP_TITLE,
    FILE_PATH_PREFIX: env.GLOBAL_FILE_PATH,
    DEV: import.meta.env.DEV,
    dateFormat
  };

  Object.defineProperty(app.config.globalProperties, '$window', { enumerable: false, get: () => window });

  Object.defineProperty(app.config.globalProperties, '$globalProps', { enumerable: false, get: () => globalProps });

  return app;
}

export function useGlobalProps(): DeepReadonly<GlobalProps> {
  return globalProps;
}
