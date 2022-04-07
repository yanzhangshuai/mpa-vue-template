import { RouteRecordRaw } from 'vue-router';
import Demo1Route from './demo1';
import { HomeRouteName } from './const';

const router: RouteRecordRaw = {
  path: '/home',
  name: HomeRouteName.DEFAULT_ROUTER,
  component: () => import(/* webpackChunkName: "module-a~home"*/ `module-a/page/home/index.vue`),
  meta: {
    auth: true
  },
  children: [
    {
      path: '',
      redirect: { name: HomeRouteName.DEMO1_ROUTER }
    },
    {
      path: 'demo2',
      name: HomeRouteName.DEMO2_ROUTER,
      component: () => import(/* webpackChunkName: "module-a~home"*/ `module-a/page/home/demo2/index.vue`)
    },
    Demo1Route
  ]
};

export default router;
