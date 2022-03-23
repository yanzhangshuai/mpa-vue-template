import fs from 'fs';
import path from 'path';
import portfinder from 'portfinder';

export const root = process.cwd();

export const resolve = (dir: string): string => {
  return path.join(root, dir);
};

export function moduleAlias(modules: Array<string>, prefixPath = 'src'): Record<string, string> {
  return modules.reduce((accumulator, current) => {
    accumulator[current] = resolve(prefixPath + '/' + current);
    return accumulator;
  }, {} as Record<string, string>);
}

/**
 * 获取可用端口
 * @returns
 * @param startPort
 */
export const findPort = (startPort: number): Promise<number> => {
  return portfinder.getPortPromise({ startPort: startPort, port: startPort });
};

/**
 * 配置文件所在路径
 */
export const configPath = resolve('config');
// 转换配置文件数据
export function wrapperEnv<T>(envConf: Record<keyof T, string>): T {
  return (Object.keys(envConf) as Array<keyof T>)
    .map((envName) => {
      const value = envConf[envName].replace(/\\n/g, '\n');
      //  布尔值
      if (/(true|false)/.test(value)) {
        return { envName: envName, value: value === 'true' };
      }
      // 数值
      if (/^\d+$/.test(value)) {
        return { envName: envName, value: Number(value) };
      }
      // 数组或对象
      if (/^[{\[].*[}\]]$/.test(value)) {
        let realValue: unknown = value;
        try {
          realValue = JSON.parse(value);
        } catch (error) {}
        return { envName: envName, value: realValue };
      }
      //  字符串
      return { envName: envName, value: value };
    })
    .reduce((prev, current) => {
      prev[current.envName] = current.value as never;
      return prev;
    }, {} as T);
}

export function getDir(_path: string) {
  const files = fs.readdirSync(_path);
  return files.filter((item) => {
    const fPath = path.join(_path, item);
    const stat = fs.statSync(fPath);
    return stat.isDirectory();
  });
}

export function getModule(_path, targetModule?: Array<string>) {
  _path = resolve(_path);
  const dir = getDir(_path);

  // 利用交集获取当前指定modules
  const intersectModules = intersection(dir, targetModule || [], (m1, m2) => m1.toLocaleLowerCase() === m2.toLocaleLowerCase());

  const module = {};

  (intersectModules.length ? intersectModules : dir).forEach((item) => {
    module[`${item}`] = path.join(_path, item);
  });

  return module;
}

export function getEntry(module: Record<string, string> | string, targetModule?: Array<string>, file = 'main.ts') {
  let _module: Record<string, string>;
  if (typeof module === 'string') {
    _module = getModule(module, targetModule);
  } else {
    _module = module;
  }

  const entry = {};
  Object.keys(_module).forEach((key) => {
    entry[key] = path.join(_module[key], file);
  });

  return entry;
}

export function isPromiseLike<T>(it: unknown): it is PromiseLike<T> {
  return it instanceof Promise || typeof (it as Promise<T>)?.then === 'function';
}

export function intersection<T>(arr1: Array<T>, arr2: Array<T>, fn?: (val1: T, val2: T) => boolean) {
  const _fn = fn || ((val1, val2) => val1 === val2);
  return arr1.filter((val1) => arr2.find((val2) => _fn(val1, val2)));
}
