import axios from 'axios';

import { createWriteStream } from 'fs';
import { join } from 'path';
import {
  ExtensionNotFoundError,
  VersionNotFoundError,
  VsixFileNotFoundError,
} from '../errors';
import type {
  ExtensionInfo,
  ExtensionVersion,
  QueryFlag,
  SearchResults,
} from '../types';

/**
 * Service for interacting with the Visual Studio Marketplace API.
 * It provides methods to query extension details, retrieve download URLs, and download VSIX files.
 *
 * @class VSCodeMarketplaceService
 * @classdesc Service for interacting with the Visual Studio Marketplace API.
 *
 * @public
 * @example
 * const vscode = new VSCodeMarketplaceService();
 * const extensionInfo = await vscode.getExtensionInfo('ms-vscode', 'vscode');
 * console.log(extensionInfo.displayName);
 *
 * @param {string} API_URL - The Visual Studio Marketplace API URL.
 *
 * @throws {ExtensionNotFoundError} if no extension is found.
 * @throws {VersionNotFoundError} if the extension or the specified version is not found.
 * @throws {VsixFileNotFoundError} if the VSIX file URL is not found.
 *
 * @returns {VSCodeMarketplaceService} The service instance.
 */
export class VSCodeMarketplaceService {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties

  /**
   * The Visual Studio Marketplace API URL.
   *
   * @private
   * @type {string}
   * @memberof VSCodeMarketplaceService
   * @readonly
   * @default 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery'
   * @example
   * console.log(vscode.API_URL);
   */
  private readonly API_URL =
    'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery';

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * Retrieves extension information for a given publisher and extension name.
   *
   * @method getExtensionInfo
   * @description Retrieves extension information for a given publisher and extension name.
   *
   * @public
   * @memberof VSCodeMarketplaceService
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
  public async getExtensionInfo(
    publisher: string,
    extension: string,
    flags: QueryFlag[],
  ): Promise<ExtensionInfo> {
    const results = await this.fetchExtensionData(publisher, extension, flags);
    const extensions = results[0].extensions;
    if (extensions.length === 0) {
      throw new ExtensionNotFoundError('Extension not found.');
    }

    return extensions[0];
  }

  /**
   * Retrieves a specific version or the latest version of an extension.
   * If no version is provided, it returns the latest version.
   *
   * @method getExtensionVersion
   * @description Retrieves a specific version or the latest version of an extension.
   *
   * @public
   * @memberof VSCodeMarketplaceService
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
  public async getExtensionVersion(
    publisher: string,
    extension: string,
    version?: string,
  ): Promise<ExtensionVersion> {
    // Use flags that include version details (e.g., 1 and 2)
    const extensionInfo = await this.getExtensionInfo(
      publisher,
      extension,
      [1, 2],
    );
    if (!version) {
      return extensionInfo.versions[0];
    }

    const foundVersion = extensionInfo.versions.find(
      (v: ExtensionVersion) => v.version === version,
    );
    if (!foundVersion) {
      throw new VersionNotFoundError('Version not found.', version);
    }

    return foundVersion;
  }

  /**
   * Retrieves the latest version string of an extension.
   * This method is a convenience wrapper around getExtensionVersion.
   *
   * @method getLatestVersion
   * @description Retrieves the latest version string of an extension.
   *
   * @public
   * @memberof VSCodeMarketplaceService
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
  public async getLatestVersion(
    publisher: string,
    extension: string,
  ): Promise<string> {
    const latestVersion = await this.getExtensionVersion(publisher, extension);

    return latestVersion.version;
  }

  /**
   * Retrieves the download URL for the VSIX file of the latest extension version.
   * This method is a convenience wrapper around getExtensionVersion.
   *
   * @method getVsixDownloadUrl
   * @description Retrieves the download URL for the VSIX file of the latest extension version.
   *
   * @public
   * @memberof VSCodeMarketplaceService
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
  public async getVsixDownloadUrl(
    publisher: string,
    extension: string,
  ): Promise<string> {
    const extensionVersion = await this.getExtensionVersion(
      publisher,
      extension,
    );
    const vsixAsset = extensionVersion.files.find(
      (file) =>
        file.assetType === 'Microsoft.VisualStudio.Services.VSIXPackage',
    );
    if (!vsixAsset) {
      throw new VsixFileNotFoundError('VSIX file not found.');
    }

    return vsixAsset.source;
  }

  /**
   * Downloads a file from the specified URL and saves it to the destination path.
   * This method is a generic file download utility.
   *
   * @method downloadFile
   * @description Downloads a file from the specified URL and saves it to the destination path.
   *
   * @public
   * @memberof VSCodeMarketplaceService
   * @instance
   * @async
   * @example
   * const filePath = await vscode.downloadFile('https://example.com/file.zip', './downloads/file.zip');
   * console.log(filePath);
   *
   * @param {string} url - The URL of the file to download.
   * @param {string} destination - The local file path where the file will be saved.
   *
   * @returns {Promise<string>} The file path of the downloaded file.
   */
  public async downloadFile(url: string, destination: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'stream' });
    const writer = createWriteStream(destination);

    return new Promise((resolve, reject) => {
      (response.data as NodeJS.ReadableStream).pipe(writer);
      writer.on('finish', () => resolve(destination));
      writer.on('error', reject);
    });
  }

  /**
   * Downloads the VSIX file for the latest version of an extension and saves it to the specified output directory.
   * This method is a convenience wrapper around getVsixDownloadUrl and downloadFile.
   *
   * @method downloadExtensionVsix
   * @description Downloads the VSIX file for the latest version of an extension and saves it to the specified output directory.
   *
   * @public
   * @memberof VSCodeMarketplaceService
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
  public async downloadExtensionVsix(
    publisher: string,
    extension: string,
    outputDir: string = '.',
  ): Promise<string> {
    const extensionVersion = await this.getExtensionVersion(
      publisher,
      extension,
    );
    const downloadUrl = await this.getVsixDownloadUrl(publisher, extension);
    const filePath = join(
      outputDir,
      `${publisher}.${extension}-${extensionVersion.version}.vsix`,
    );

    return this.downloadFile(downloadUrl, filePath);
  }

  // Private methods

  /**
   * Private helper method to query the Visual Studio Marketplace API.
   * It fetches extension data based on the publisher, extension, and flags.
   *
   * @method fetchExtensionData
   * @description Fetches extension data based on the publisher, extension, and flags.
   *
   * @private
   * @memberof VSCodeMarketplaceService
   * @instance
   * @async
   * @example
   * const results = await vscode.fetchExtensionData('ms-vscode', 'vscode', [1, 2]);
   * console.log(results);
   *
   * @param {string} publisher - The publisher's name.
   * @param {string} extension - The extension's name.
   * @param {QueryFlag[]} flags - An array of QueryFlag values.
   *
   * @returns {Promise<SearchResults[]>} An array of search results from the API.
   */
  private async fetchExtensionData(
    publisher: string,
    extension: string,
    flags: QueryFlag[],
  ): Promise<SearchResults[]> {
    const payload = {
      filters: [
        {
          criteria: [
            {
              filterType: 7,
              value: `${publisher}.${extension}`,
            },
          ],
        },
      ],
      flags: (flags as number[]).reduce((acc, flag) => acc | flag, 0),
    };

    const response = await axios.post(this.API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;api-version=6.0-preview.1',
      },
    });
    const data = response.data as { results: SearchResults[] };

    return data.results;
  }
}
