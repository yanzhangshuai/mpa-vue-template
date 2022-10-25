import type { Plugin } from 'vue';

import { createAsker } from '@mwjz/asker';

import { setupInterceptor } from './interceptor/index';

const HttpPlugin: Plugin = {
  install() {
    create();
  }
};

export default HttpPlugin;

function create() {
  const env = import.meta.env;
  const asker = createAsker({
    request: {
      ignoreCancelToken: false,
      baseURL: env.GLOBAL_API_BASE_URL,
      uploadBaseUrl: env.GLOBAL_UPLOAD_BASE_URL
    }
  });

  setupInterceptor(asker.interceptor);
}
