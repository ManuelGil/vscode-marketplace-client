import type { ExtensionFile } from './extension-file';

/**
 * Extension version type.
 *
 * @interface ExtensionVersion
 * @description Extension version type.
 *
 * @public
 * @memberof Types
 * @example
 * const extensionVersion = {
 *   version: '1.0.0',
 *   flags: 'public',
 *   lastUpdated: '2021-01-01T00:00:00.000Z',
 *   files: [
 *     {
 *       assetType: 'Microsoft.VisualStudio.Services.VSIXPackage',
 *       source: 'https://example.com/file.vsix'
 *     }
 *   ],
 *   assetUri: 'https://example.com',
 *   fallbackAssetUri: 'https://example.com'
 * };
 *
 * @param {string} version - The version.
 * @param {string} flags - The flags.
 * @param {string} lastUpdated - The last updated date.
 * @param {ExtensionFile[]} files - The files.
 * @param {string} assetUri - The asset URI.
 * @param {string} fallbackAssetUri - The fallback asset URI.
 *
 * @returns {ExtensionVersion} The extension version.
 */
export interface ExtensionVersion {
  version: string;
  flags: string;
  lastUpdated: string;
  files: ExtensionFile[];
  assetUri: string;
  fallbackAssetUri: string;
}
