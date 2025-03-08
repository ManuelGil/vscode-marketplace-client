/**
 * Extension file type.
 *
 * @interface ExtensionFile
 * @description Extension file type.
 *
 * @public
 * @memberof Types
 * @example
 * const extensionFile = {
 *   assetType: 'Microsoft.VisualStudio.Services.VSIXPackage',
 *   source: 'https://example.com/file.vsix'
 * };
 *
 * @param {string} assetType - The asset type.
 * @param {string} source - The source URL.
 *
 * @returns {ExtensionFile} The extension file.
 */
export interface ExtensionFile {
  assetType: string;
  source: string;
}
