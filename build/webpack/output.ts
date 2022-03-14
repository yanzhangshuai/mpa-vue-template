import { AssetInfo } from 'webpack';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function filename(path: unknown, asset: AssetInfo): string {
  const module = path['chunk']['runtime'];

  if (typeof module === 'string') {
    return `${module}/js/[name]_[contenthash].js`;
  }

  return `common/js/[name].[contenthash].js`;
}

export function chunkFilename(path: unknown): string {
  const module = path['chunk']['runtime'];
  return `${module}/js/[name].[contenthash].js`;
}

export function cssFilename(path: unknown): string {
  const module = path['chunk']['runtime'];

  if (typeof module === 'string') {
    return `${module}/css/[name]_[contenthash].css`;
  }

  return `common/css/[name].[contenthash].css`;
}

export function cssChunkFilename(path: unknown): string {
  const module = path['chunk']['runtime'];
  return `${module}/css/[name].[contenthash].css`;
}
