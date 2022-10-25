import fs from 'fs';
import path from 'path';

import { resolve } from './path';
import { intersection } from './helper';

import type { Module } from '../type/vite';

/**
 * 获取module
 * @param modulePath 目录
 * @param targetModule 目标module
 * @returns
 */
export function getModule(modulePath: string, targetModule?: Array<string>): Module {
  modulePath = resolve(modulePath);
  const _path = getModulePath(modulePath);

  // 利用交集获取当前指定modules
  const intersectModules = intersection(_path, targetModule || [], (m1, m2) => m1.toLocaleLowerCase() === m2.toLocaleLowerCase());

  const module: Module = {};

  (intersectModules.length ? intersectModules : _path).forEach((item) => {
    module[`${item}`] = path.join(modulePath, item);
  });

  return module;
}

/**
 *  获取入口文件
 * @param module
 * @param targetModule
 * @param file
 * @returns
 */
export function getEntry(module: Module | string, targetModule?: Array<string>, file = 'main.ts'): Module {
  let _module: Record<string, string>;
  if (typeof module === 'string')
    _module = getModule(module, targetModule);
  else
    _module = module;

  const entry: Module = {};
  Object.keys(_module).forEach((key) => {
    entry[key] = path.join(_module[key], file);
  });

  return entry;
}

function getModulePath(modulePath: string) {
  const files = fs.readdirSync(modulePath);
  return files.filter((item) => {
    const _path = path.join(modulePath, item);
    const stat = fs.statSync(_path);
    return stat.isDirectory();
  });
}
