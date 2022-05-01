import type { Router } from 'vue-router';
import { createAuthGuard } from './auth';
import { createPermissionGuard } from './permission';
import { createHttpGuard } from '@/router/guard/http';

export function setupRouterGuard(router: Router): void {
  createAuthGuard(router);
  createPermissionGuard(router);
  createHttpGuard(router);
}
