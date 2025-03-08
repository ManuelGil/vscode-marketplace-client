import { VSCodeExtensionError } from './vscode-extension-error';

/**
 * Error thrown when a specific version of an extension is not found.
 *
 * @class VersionNotFoundError
 * @classdesc Represents an error that occurs when a version of an extension is not found.
 * @extends {VSCodeExtensionError}
 *
 * @public
 * @memberof Errors
 * @example
 * throw new VersionNotFoundError('Version not found.', '1.0.0');
 *
 * @param {string} extensionId - The extension identifier.
 * @param {string} version - The version string.
 *
 * @returns {VersionNotFoundError} The error instance.
 */
export class VersionNotFoundError extends VSCodeExtensionError {
  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  /**
   * Constructs a new VersionNotFoundError.
   *
   * @constructor
   * @description Creates a new VersionNotFoundError.
   *
   * @public
   * @memberof Errors.VersionNotFoundError
   * @example
   *
   * @param {string} extensionId - The extension identifier.
   * @param {string} version - The version string.
   */
  constructor(extensionId: string, version: string) {
    super(`Version "${version}" for extension "${extensionId}" not found.`);
    this.name = 'VersionNotFoundError';
  }
}
