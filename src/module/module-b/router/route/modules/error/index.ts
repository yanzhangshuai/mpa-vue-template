import type { RouteRecordRaw } from 'vue-router';

import { ErrorRouteName } from './const';

const router: RouteRecordRaw = {
  path: '/404',
  name: ErrorRouteName.NOT_FOUND,
  component: () => import(/* webpackChunkName: "module-b~error" */ 'module-b/page/error/404/index.vue')
};

export default router;
