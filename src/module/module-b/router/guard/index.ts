import type { Router } from 'vue-router';

import { createHttpGuard } from '@/router/guard/http';

import { createPermissionGuard } from './permission';

export function setupRouterGuard(router: Router): void {
  createHttpGuard(router);
  createPermissionGuard(router);
}
