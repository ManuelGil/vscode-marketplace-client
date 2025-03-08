import type { ExtensionInfo } from './extension-info';

/**
 * Represents search results.
 *
 * @interface SearchResults
 * @description Represents search results.
 *
 * @public
 * @memberof Types
 * @example
 * const searchResults = await vscode.searchExtensions('vscode');
 * console.log(searchResults.extensions);
 *
 * @param {ExtensionInfo[]} extensions - The extension information.
 *
 * @returns {SearchResults} The search results.
 */
export interface SearchResults {
  extensions: ExtensionInfo[];
}
