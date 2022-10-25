/**
 * 交集
 * @param arr1
 * @param arr2
 * @param fn
 * @returns
 */
export function intersection<T>(arr1: Array<T>, arr2: Array<T>, fn?: (val1: T, val2: T) => boolean) {
  const _fn = fn || ((val1, val2) => val1 === val2);
  return arr1.filter(val1 => arr2.find(val2 => _fn(val1, val2)));
}

/**
 * 去除字符串特殊字符
 * @param str
 */
export function trimSpec(str: string): string {
  // 去除字符串中特殊字符串
  return str.replace(/[^a-zA-Z0-9]/g, '');
}
