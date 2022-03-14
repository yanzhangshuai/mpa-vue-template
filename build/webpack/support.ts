import { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import { Env } from '../type';
import { vueSupport } from './supports/vue';
import { htmlSupport } from './supports/html';
import { styleSupport } from './supports/style';
import { reportSupport } from './supports/report';
import { scriptSupport } from './supports/script';
import { variableSupport } from './supports/variable';
import { compressSupport } from './supports/compress';
import { compilationInfoSupport } from './supports/compilation-info';
export function support(module: Record<string, string>, isBuild: boolean, env: Env): Configuration {
  const supports = [vueSupport, scriptSupport, compilationInfoSupport, styleSupport, variableSupport, htmlSupport, reportSupport, compressSupport];

  return webpackMerge(supports.map((support) => support(module, isBuild, env)));
}
