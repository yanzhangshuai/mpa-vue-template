import { trimSpec } from '../util/helper';

import type { PreRenderedAsset, PreRenderedChunk } from 'rollup';

export function entryFileNames(chunkInfo: PreRenderedChunk): string {
  try {
    const _path = chunkInfo?.facadeModuleId?.split('/');
    const module = _path?.[_path.length - 2] || 'common';

    return `assets/scripts/${trimSpec(module)}/[name].[hash].js`;
  }
  catch (error) {
    console.log('----entryFileNames', error);
  }
}

export function chunkFileNames(chunkInfo: PreRenderedChunk) {
  try {
    const _path = chunkInfo?.facadeModuleId?.split('/');
    const module = _path?.[_path.length - 2] || 'common';

    return `assets/scripts/${trimSpec(module)}/[name].[hash].js`;
  }
  catch (error) {
    console.log('----chunkFileNames', error);
  }
}

export function assetFileNames(_chunkInfo: PreRenderedAsset) {
  return 'assets/[ext]/[name].[hash].[ext]';
}

/**
 * 生成chunk
 * @param id
 * @param api
 */
export function manualChunks(id: string): string | null | undefined {
  if (id.includes('node_modules'))
    return nodeModulesChunks(id);

  if (id.includes('/src/page'))
    return pageChunks(id);

  return 'index';
}

function nodeModulesChunks(id: string) {
  if (/[\\/]node_modules[\\/](@)?vue/.test(id))
    return '__libs';

  return '__vendors';
}

function pageChunks(id: string) {
  return id.match(/src\/page\/(\w+)\//)?.[1] || 'page';
}
