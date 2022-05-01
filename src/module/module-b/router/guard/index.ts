import type { Router } from 'vue-router';
import { createPermissionGuard } from './permission';
import { createHttpGuard } from '@/router/guard/http';

export function setupRouterGuard(router: Router): void {
  createHttpGuard(router);
  createPermissionGuard(router);
}
