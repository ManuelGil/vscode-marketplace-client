/**
 * Entry point (invoker) for the VS Code Marketplace Service.
 * This file exposes an invoker object with helper methods that wrap
 * the service functionality, making it easy to consume in external projects.
 */

import {
  ExtensionNotFoundError,
  VersionNotFoundError,
  VSCodeExtensionError,
  VsixFileNotFoundError,
} from './errors';
import { VSCodeMarketplaceService } from './services';
import type { ExtensionInfo, ExtensionVersion, QueryFlag } from './types';

// Instantiate the marketplace service
const marketplaceService = new VSCodeMarketplaceService();

/**
 * The VSCodeMarketplaceClient  object acts as a facade to interact with the
 * VS Code Marketplace Service. It exposes helper methods to retrieve extension
 * information, download VSIX files, and more.
 *
 * @public
 * @example
 * const extensionInfo = await VSCodeMarketplaceClient .getExtensionInfo('ms-vscode', 'vscode');
 * console.log(extensionInfo.displayName);
 */
export const VSCodeMarketplaceClient = {
  /**
   * Retrieves extension information for a given publisher and extension name.
   *
   * @method getExtensionInfo
   * @description Retrieves extension information for a given publisher and extension name.
   *
   * @public
   * @memberof VSCodeMarketplaceClient
   * @instance
   * @async
   * @example
   * const extensionInfo = await vscode.getExtensionInfo('ms-vscode', 'vscode', [1, 2]);
   * console.log(extensionInfo.displayName);
   *
   * @param {string} publisher - The publisher's name.
   * @param {string} extension - The extension's name.
   * @param {QueryFlag} flags - An array of QueryFlag values that determine the response details.
   *
   * @returns {Promise<ExtensionInfo>} The extension information.
   *
   * @throws {ExtensionNotFoundError} if no extension is found.
   */
  getExtensionInfo: async (
    publisher: string,
    extension: string,
    flags: QueryFlag[],
  ): Promise<ExtensionInfo> => {
    return marketplaceService.getExtensionInfo(publisher, extension, flags);
  },

  /**
   * Retrieves a specific version or the latest version of an extension.
   * If no version is provided, it returns the latest version.
   *
   * @method getExtensionVersion
   * @description Retrieves a specific version or the latest version of an extension.
   *
   * @public
   * @memberof VSCodeMarketplaceClient
   * @instance
   * @async
   * @example
   * const extensionVersion = await vscode.getExtensionVersion('ms-vscode', 'vscode', '1.0.0');
   * console.log(extensionVersion.version);
   *
   * @param {string} publisher - The publisher's name.
   * @param {string} extension - The extension's name.
   * @param {string} [version] - (Optional) The desired version string. If not provided, returns the latest version.
   *
   * @returns {Promise<ExtensionVersion>} The extension version details.
   *
   * @throws {VersionNotFoundError} if the extension or the specified version is not found.
   */
  getExtensionVersion: async (
    publisher: string,
    extension: string,
    version?: string,
  ): Promise<ExtensionVersion> => {
    return marketplaceService.getExtensionVersion(
      publisher,
      extension,
      version,
    );
  },

  /**
   * Retrieves the latest version string of an extension.
   * This method is a convenience wrapper around getExtensionVersion.
   *
   * @method getLatestVersion
   * @description Retrieves the latest version string of an extension.
   *
   * @public
   * @memberof VSCodeMarketplaceClient
   * @instance
   * @async
   * @example
   * const latestVersion = await vscode.getLatestVersion('ms-vscode', 'vscode');
   * console.log(latestVersion);
   *
   * @param {string} publisher - The publisher's name.
   * @param {string} extension - The extension's name.
   *
   * @returns {Promise<string>} The latest version as a string.
   */
  getLatestVersion: async (
    publisher: string,
    extension: string,
  ): Promise<string> => {
    return marketplaceService.getLatestVersion(publisher, extension);
  },

  /**
   * Retrieves the download URL for the VSIX file of the latest extension version.
   * This method is a convenience wrapper around getExtensionVersion.
   *
   * @method getVsixDownloadUrl
   * @description Retrieves the download URL for the VSIX file of the latest extension version.
   *
   * @public
   * @memberof VSCodeMarketplaceClient
   * @instance
   * @async
   * @example
   * const downloadUrl = await vscode.getVsixDownloadUrl('ms-vscode', 'vscode');
   * console.log(downloadUrl);
   *
   * @param {string} publisher - The publisher's name.
   * @param {string} extension - The extension's name.
   *
   * @returns {Promise<string>} The URL to download the VSIX file.
   *
   * @throws {VsixFileNotFoundError} if the VSIX file URL is not found.
   */
  getVsixDownloadUrl: async (
    publisher: string,
    extension: string,
  ): Promise<string> => {
    return marketplaceService.getVsixDownloadUrl(publisher, extension);
  },

  /**
   * Downloads the VSIX file for the latest version of an extension and saves it to the specified output directory.
   * This method is a convenience wrapper around getVsixDownloadUrl and downloadFile.
   *
   * @method downloadExtensionVsix
   * @description Downloads the VSIX file for the latest version of an extension and saves it to the specified output directory.
   *
   * @public
   * @memberof VSCodeMarketplaceClient
   * @instance
   * @async
   * @example
   * const filePath = await vscode.downloadExtensionVsix('ms-vscode', 'vscode', './downloads');
   * console.log(filePath);
   *
   * @param {string} publisher - The publisher's name.
   * @param {string} extension - The extension's name.
   * @param {string} outputDir - Directory where the VSIX file will be saved (default is the current directory).
   *
   * @returns {Promise<string>} The file path to the downloaded VSIX file.
   */
  downloadExtensionVsix: async (
    publisher: string,
    extension: string,
    outputDir: string = '.',
  ): Promise<string> => {
    return marketplaceService.downloadExtensionVsix(
      publisher,
      extension,
      outputDir,
    );
  },
};

// Re-export service, error classes, and types for direct access if needed.
export {
  type ExtensionInfo,
  ExtensionNotFoundError,
  type ExtensionVersion,
  VersionNotFoundError,
  VSCodeExtensionError,
  VSCodeMarketplaceService,
  VsixFileNotFoundError,
};
