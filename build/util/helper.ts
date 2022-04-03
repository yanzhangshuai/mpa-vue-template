import portfinder from 'portfinder';

/**
 * 获取可用端口
 * @returns
 * @param startPort
 */
export const findPort = (startPort: number): Promise<number> => {
  return portfinder.getPortPromise({ startPort: startPort, port: startPort });
};

/**
 * 交集
 * @param arr1
 * @param arr2
 * @param fn
 * @returns
 */
export function intersection<T>(arr1: Array<T>, arr2: Array<T>, fn?: (val1: T, val2: T) => boolean) {
  const _fn = fn || ((val1, val2) => val1 === val2);
  return arr1.filter((val1) => arr2.find((val2) => _fn(val1, val2)));
}
