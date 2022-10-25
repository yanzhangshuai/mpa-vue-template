import type { PluginFn } from '../../type/vite';

export const notePlugin: PluginFn = (module, mode, env) => {
  return {
    name: 'note-plugin',
    apply: 'serve',
    buildStart: () => {
      const protocol = env.VITE_SERVER_HTTPS ? 'https' : 'http';
      const host = env.VITE_SERVER_HOST;
      const port = env.VITE_SERVER_PORT;

      Object.keys(module).forEach((n) => {
        setTimeout(() => console.log('==============================:' + `${protocol}://${host}:${port}/${n}`), 100);
      });
    },
    configureServer: () => {
      return () => {
      // setTimeout(() =>  console.log('server', server))
      };
    }
  };
};
