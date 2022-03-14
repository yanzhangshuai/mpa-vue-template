import { Configuration } from 'webpack';
import { Env } from '../type';

export type SupportFn = (module: Record<string, string>, isBuild?: boolean, env?: Env) => Configuration;
