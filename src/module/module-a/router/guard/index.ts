import type { Router } from 'vue-router';

import { createHttpGuard } from '@/router/guard/http';

import { createAuthGuard } from './auth';
import { createPermissionGuard } from './permission';

export function setupRouterGuard(router: Router): void {
  createAuthGuard(router);
  createPermissionGuard(router);
  createHttpGuard(router);
}
