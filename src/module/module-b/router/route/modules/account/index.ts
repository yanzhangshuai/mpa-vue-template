import { createVNode } from 'vue';
import { RouteRecordRaw, RouterView } from 'vue-router';
import { AccountRouteName } from './const';

const router: RouteRecordRaw = {
  path: '/account',
  name: AccountRouteName.DEFAULT_ROUTER,
  component: () => /* webpackChunkName: "module-b~account"*/ Promise.resolve(createVNode(RouterView)),
  children: [
    {
      path: '',
      redirect: { name: AccountRouteName.LOGIN_ROUTER }
    },
    {
      path: 'login',
      name: AccountRouteName.LOGIN_ROUTER,
      component: () => import(/* webpackChunkName: "module-b~account"*/ `module-b/page/account/login/index.vue`)
    },
    {
      path: 'register',
      name: AccountRouteName.REGISTER_ROUTER,
      component: () => import(/* webpackChunkName: "module-b~account"*/ `module-b/page/account/register/index.vue`)
    }
  ]
};

export default router;
