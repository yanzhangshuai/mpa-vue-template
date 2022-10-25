import type { RouteRecordRaw } from 'vue-router';

import { flatMap, isArray } from 'lodash-es';

import { moduleFilter } from '@/util/helper';

import { ErrorRouteName } from './modules/error/const';
import { AccountRouteName } from './modules/account/const';

const routes: Array<RouteRecordRaw> = [
  ...findModuleRoutes(),
  {
    path: '/',
    redirect: AccountRouteName.DEFAULT
  },
  {
    path: '/:catchAll(.*)',
    redirect: {
      name: ErrorRouteName.NOT_FOUND
    }
  }
];

export default routes;

/**
 * 遍历moduleRoutes
 * @returns
 */
function findModuleRoutes(): Array<RouteRecordRaw> {
  const modules = moduleFilter(import.meta.glob('./modules/*/index.ts', { eager: true })) as Record<string, Array<RouteRecordRaw> | RouteRecordRaw>;

  return flatMap(Object.values(modules).map(module => isArray(module) ? module : [module]));
}
