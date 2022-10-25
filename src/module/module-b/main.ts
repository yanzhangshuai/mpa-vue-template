import 'windi.css';
import { createApp } from 'vue';

import Plugin from '@/plugin';

import Service from './service';
import Store from './store';
import Router from './router';
import { ModuleName } from './const';
import App from './page/app.vue';
import '@/asset/style/index.less';

const app = createApp(App);

app
  .use(Plugin)
  .use(Router, {
    base: ModuleName,
    readyCallBack: () => app.mount('#app')
  })
  .use(Service)
  .use(Store);
