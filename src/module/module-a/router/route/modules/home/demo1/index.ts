import { RouteRecordRaw } from 'vue-router';
import { HomeRouterName } from '../const';

const router: RouteRecordRaw = {
  path: 'demo1',
  name: HomeRouterName.HOME_DEMO1_ROUTER,
  component: () => import(/* webpackChunkName: "home"*/ `module-a/page/home/demo1/index.vue`),
  meta: {
    title: 'demo1'
  }
};

export default router;
