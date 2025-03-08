import type { ExtensionVersion } from './extension-version';
import type { PublisherInfo } from './publisher-info';

/**
 * Represents information about an extension.
 *
 * @interface ExtensionInfo
 * @description Represents information about an extension.
 *
 * @public
 * @memberof Types
 * @example
 * const extensionInfo = await vscode.getExtensionInfo('ms-vscode', 'vscode');
 * console.log(extensionInfo.displayName);
 *
 * @param {PublisherInfo} publisher - The publisher information.
 * @param {string} extensionId - The extension identifier.
 * @param {string} extensionName - The extension name.
 * @param {string} displayName - The display name.
 * @param {string} flags - The flags.
 * @param {string} lastUpdated - The last updated date.
 * @param {string} publishedDate - The published date.
 * @param {string} releaseDate - The release date.
 * @param {string} presentInConflictList - The present in conflict list.
 * @param {string} shortDescription - The short description.
 * @param {ExtensionVersion[]} versions - The extension versions.
 * @param {string[]} categories - The categories.
 * @param {string[]} tags - The tags.
 * @param {Record<string, number>} statistics - The statistics.
 * @param {number} deploymentType - The deployment type.
 *
 * @returns {ExtensionInfo} The extension information.
 */
export interface ExtensionInfo {
  publisher: PublisherInfo;
  extensionId: string;
  extensionName: string;
  displayName: string;
  flags: string;
  lastUpdated: string;
  publishedDate: string;
  releaseDate: string;
  presentInConflictList: string;
  shortDescription: string;
  versions: ExtensionVersion[];
  categories: string[];
  tags: string[];
  statistics: Record<string, number>;
  deploymentType: number;
}
