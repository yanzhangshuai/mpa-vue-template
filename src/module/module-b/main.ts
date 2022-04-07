import 'windi.css';
import { createApp } from 'vue';
import { setupPlugin } from '@/plugin';
import { setupService } from '@/service';
// import { setupComponent } from '@/component';
// import { setupDirective } from '@/directive';
import { ModuleName } from './const';
import { setupStore } from './store';
import { isReady, setupRouter } from './router';
import App from './page/app.vue';
import '@/asset/style/index.less';

const app = createApp(App);

setupPlugin(app);

// setupComponent(app);

// setupDirective(app);

setupRouter(app, ModuleName);

setupService(app);

setupStore(app);

//  等待router
isReady().then(() => {
  app.mount('#app');
});
