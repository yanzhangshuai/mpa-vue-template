import type { RouteRecordRaw } from 'vue-router';

import Demo1Route from './demo1';
import { HomeRouteName } from './const';

const router: RouteRecordRaw = {
  path: '/home',
  component: () => import('module-a/page/home/index.vue'),
  meta: { auth: true },
  children: [
    {
      path: '',
      name: HomeRouteName.DEFAULT,
      redirect: { name: HomeRouteName.DEMO1 }
    },
    Demo1Route,
    {
      path: 'demo2',
      name: HomeRouteName.DEMO2,
      component: () => import('module-a/page/home/demo2/index.vue')
    }
  ]
};

export default router;
