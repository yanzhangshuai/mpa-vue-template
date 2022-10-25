declare module 'vue' {
  export interface GlobalComponents {
    'config-provider': typeof import('./modules/config-provider/index.vue')['default']
    'global-props-demo': typeof import('./modules/global-props-demo/index.vue')['default']
  }
}
export {};
