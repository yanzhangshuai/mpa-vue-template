import { RouteRecordRaw } from 'vue-router';
import { HomeRouteName } from '../const';

const route: RouteRecordRaw = {
  path: 'demo1',
  name: HomeRouteName.DEMO1_ROUTER,
  component: () => import(/* webpackChunkName: "module-a~home"*/ `module-a/page/home/demo1/index.vue`),
  meta: { title: 'demo1' }
};

export default route;
