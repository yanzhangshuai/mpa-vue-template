import { AssetInfo } from 'webpack';
import { Mode } from '../type/webpack';

/**
 * js filename
 * @param mode
 * @param pathData
 * @param assetInfo
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function filename(mode: Mode, pathData: unknown, assetInfo: AssetInfo): string {
  const module = pathData['chunk']['runtime'];
  const name = pathData['chunk']['name'] === module ? 'index' : pathData['chunk']['name'];

  const hash = mode === 'production' ? '[contenthash].' : '';

  if (typeof module === 'string') {
    return `${module}/js/${name}.${hash}js`;
  }

  return `common/js/${name}.${hash}js`;
}

/**
 * js chunkFilename
 * @param mode
 * @param pathData
 * @param assetInfo
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function chunkFilename(mode: Mode, pathData: unknown, assetInfo?: AssetInfo): string {
  const module = pathData['chunk']['runtime'];
  const name = pathData['chunk']['name'] === module ? 'index' : pathData['chunk']['name'];

  const hash = mode === 'production' ? '[contenthash].' : '';

  return `${module}/js/${name}.${hash}js`;
}

/**
 * css filename
 * @param mode
 * @param pathData
 * @param assetInfo
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cssFilename(mode: Mode, pathData: unknown, assetInfo?: AssetInfo): string {
  const module = pathData['chunk']['runtime'];

  const name = pathData['chunk']['name'] === module ? 'index' : pathData['chunk']['name'];

  const hash = mode === 'production' ? '[contenthash].' : '';

  if (typeof module === 'string') {
    return `${module}/css/${name}.${hash}css`;
  }

  return `common/css/${name}.${hash}css`;
}

/**
 * css chunkFilename
 * @param mode
 * @param path
 * @param assetInfo
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cssChunkFilename(mode: Mode, path: unknown, assetInfo?: AssetInfo): string {
  const module = path['chunk']['runtime'];
  const name = path['chunk']['name'] === module ? 'index' : path['chunk']['name'];

  const hash = mode === 'production' ? '[contenthash]' : '';

  return `${module}/css/${name}.${hash}.css`;
}
