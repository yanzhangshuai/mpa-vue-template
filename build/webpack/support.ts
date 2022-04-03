import { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import { Env } from '../type/env';
import { Mode, SupportFn, Module } from '../type/webpack';
import { vueSupport } from './supports/vue';
import { htmlSupport } from './supports/html';
import { styleSupport } from './supports/style';
import { reportSupport } from './supports/report';
import { scriptSupport } from './supports/script';
import { chunksSupport } from './supports/chunks';
import { variableSupport } from './supports/variable';
import { compressionSupport } from './supports/compression';
import { compilationInfoSupport } from './supports/compilation-info';

export function support(module: Module, mode: Mode, env: Env): Configuration {
  const supports: Array<SupportFn> = [vueSupport, scriptSupport, chunksSupport, styleSupport, variableSupport, htmlSupport, compilationInfoSupport, compressionSupport, reportSupport];

  return webpackMerge(supports.map((support) => support(module, mode, env)));
}
