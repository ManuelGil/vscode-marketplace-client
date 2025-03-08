import { VSCodeExtensionError } from './vscode-extension-error';

/**
 * Error thrown when the requested extension is not found.
 *
 * @class ExtensionNotFoundError
 * @classdesc Represents an error that occurs when an extension is not found.
 * @extends {VSCodeExtensionError}
 *
 * @public
 * @memberof Errors
 * @example
 * throw new ExtensionNotFoundError('Extension not found.');
 *
 * @param {string} extensionId - The extension identifier.
 *
 * @returns {ExtensionNotFoundError} The error instance.
 */
export class ExtensionNotFoundError extends VSCodeExtensionError {
  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  /**
   * Constructs a new ExtensionNotFoundError.
   *
   * @constructor
   * @description Creates a new ExtensionNotFoundError.
   *
   * @public
   * @memberof Errors.ExtensionNotFoundError
   * @example
   * throw new ExtensionNotFoundError('my-extension');
   *
   * @param {string} extensionId - The extension identifier.
   */
  constructor(extensionId: string) {
    super(`Extension "${extensionId}" not found.`);
    this.name = 'ExtensionNotFoundError';
  }
}
