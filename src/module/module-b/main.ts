import { createApp } from 'vue';
import { setupPlugin } from '@/plugin';
import { setupService } from '@/service';
import { setupDirective } from '@/directive';
import { setupStore } from './store';
import { setupComponent } from './component';
import { isReady, setupRouter } from './router';
import App from './page/app.vue';
import 'windi.css';
import '@/asset/style/index.less';

const app = createApp(App);

setupPlugin(app);

setupComponent(app);

setupDirective(app);

setupRouter(app, 'module-b');

setupService(app);

setupStore(app);

//  等待router
isReady().then(() => {
  app.mount('#app');
});
