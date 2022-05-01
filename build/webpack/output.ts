/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AssetInfo } from 'webpack';
import type { Mode } from '../type/webpack';

/**
 * js filename
 * @param mode
 * @param pathData
 * @param _assetInfo
 * @returns
 */
export function filename(mode: Mode, pathData: any, _assetInfo: AssetInfo): string {
  const module = pathData.chunk.runtime;
  const name = pathData.chunk.name === module ? 'index' : pathData.chunk.name;

  const hash = mode === 'production' ? '[contenthash].' : '';

  if (typeof module === 'string')
    return `${module}/js/${name}.${hash}js`;

  return `common/js/${name}.${hash}js`;
}

/**
 * js chunkFilename
 * @param mode
 * @param pathData
 * @param _assetInfo
 * @returns
 */
export function chunkFilename(mode: Mode, pathData: any, _assetInfo: AssetInfo): string {
  const module = pathData.chunk.runtime;
  const name = pathData.chunk.name === module ? 'index' : pathData.chunk.name;

  const hash = mode === 'production' ? '[contenthash].' : '';

  return `${module}/js/${name}.${hash}js`;
}

/**
 * css filename
 * @param mode
 * @param pathData
 * @param _assetInfo
 * @returns
 */
export function cssFilename(mode: Mode, pathData: any, _assetInfo: AssetInfo): string {
  const module = pathData.chunk.runtime;

  const name = pathData.chunk.name === module ? 'index' : pathData.chunk.name;

  const hash = mode === 'production' ? '[contenthash].' : '';

  if (typeof module === 'string')
    return `${module}/css/${name}.${hash}css`;

  return `common/css/${name}.${hash}css`;
}

/**
 * css chunkFilename
 * @param mode
 * @param pathData
 * @param _assetInfo
 * @returns
 */
export function cssChunkFilename(mode: Mode, pathData: any, _assetInfo: AssetInfo): string {
  const module = pathData.chunk.runtime;
  const name = pathData.chunk.name === module ? 'index' : pathData.chunk.name;

  const hash = mode === 'production' ? '[contenthash]' : '';

  return `${module}/css/${name}.${hash}.css`;
}
