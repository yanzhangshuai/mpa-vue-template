import { RouteRecordRaw } from 'vue-router';
import Demo1Router from './demo1';
import { HomeRouterName } from './const';

const router: RouteRecordRaw = {
  path: '/home',
  name: HomeRouterName.HOME_ROUTER,
  component: () => import(/* webpackChunkName: "home"*/ `module-a/page/home/index.vue`),
  meta: {
    auth: true
  },
  children: [
    {
      path: '',
      redirect: { name: HomeRouterName.HOME_DEMO1_ROUTER }
    },
    Demo1Router,
    {
      path: 'demo2',
      name: HomeRouterName.HOME_DEMO2_ROUTER,
      component: () => import(/* webpackChunkName: "home"*/ `module-a/page/home/demo2/index.vue`)
    }
  ]
};

export default router;
