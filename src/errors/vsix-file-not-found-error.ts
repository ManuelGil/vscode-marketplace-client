import { VSCodeExtensionError } from './vscode-extension-error';

/**
 * Error thrown when the VSIX file for an extension is not found.
 *
 * @class VsixFileNotFoundError
 * @classdesc Represents an error that occurs when the VSIX file for an extension is not found.
 * @extends {VSCodeExtensionError}
 *
 * @public
 * @memberof Errors
 * @example
 * throw new VsixFileNotFoundError('VSIX file not found.');
 *
 * @param {string} extensionId - The extension identifier.
 */
export class VsixFileNotFoundError extends VSCodeExtensionError {
  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  /**
   * Constructs a new VsixFileNotFoundError.
   *
   * @constructor
   * @description Creates a new VsixFileNotFoundError.
   *
   * @public
   * @memberof Errors.VsixFileNotFoundError
   * @example
   * throw new VsixFileNotFoundError('my-extension');
   *
   * @param {string} extensionId - The extension identifier
   */
  constructor(extensionId: string) {
    super(`VSIX file for extension "${extensionId}" not found.`);
    this.name = 'VsixFileNotFoundError';
  }
}
