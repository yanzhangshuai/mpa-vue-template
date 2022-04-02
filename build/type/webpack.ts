import { Configuration } from 'webpack';
import { Env } from './env';

export type Mode = 'development' | 'production';

export type Module = Record<string, string>;

export type SupportFn = (module: Module, mode: Mode, env: Env) => Configuration;
