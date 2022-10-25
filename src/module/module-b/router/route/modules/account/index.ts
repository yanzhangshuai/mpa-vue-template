import { createVNode } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { RouterView } from 'vue-router';

import { AccountRouteName } from './const';

const router: RouteRecordRaw = {
  path: '/account',
  component: () => /* webpackChunkName: "module-b~account" */ Promise.resolve(createVNode(RouterView)),
  children: [
    {
      path: '',
      name: AccountRouteName.DEFAULT,
      redirect: { name: AccountRouteName.LOGIN }
    },
    {
      path: 'login',
      name: AccountRouteName.LOGIN,
      component: () => import(/* webpackChunkName: "module-b~account" */ 'module-b/page/account/login/index.vue')
    },
    {
      path: 'register',
      name: AccountRouteName.REGISTER,
      component: () => import(/* webpackChunkName: "module-b~account" */ 'module-b/page/account/register/index.vue')
    }
  ]
};

export default router;
