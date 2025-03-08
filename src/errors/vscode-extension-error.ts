// VSCodeExtensionError.ts

/**
 * Custom error class for VS Code extension-related errors.
 * Includes additional properties for better error handling.
 *
 * @class VSCodeExtensionError
 * @classdesc Represents an error that occurred while working with VS Code extensions.
 * @extends {Error} The base error class.
 *
 * @public
 * @memberof Errors
 * @example
 * throw new VSCodeExtensionError('An error occurred while working with VS Code extensions.');
 *
 * @property {Date} timestamp - The timestamp when the error occurred.
 * @property {number} [errorCode] - (Optional) A numeric code representing the error.
 */
export class VSCodeExtensionError extends Error {
  // --------------------------------------------------
  // Properties
  // --------------------------------------------------

  // Public properties

  /**
   * The timestamp when the error occurred.
   *
   * @public
   * @type {Date}
   * @memberof Errors.VSCodeExtensionError
   * @instance
   * @readonly
   * @example
   * console.log(error.timestamp);
   */
  readonly timestamp: Date;

  /**
   * A numeric code representing the error.
   *
   * @public
   * @type {number}
   * @memberof Errors.VSCodeExtensionError
   * @instance
   * @readonly
   * @example
   * console.log(error.errorCode);
   */
  readonly errorCode?: number;

  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  /**
   * Constructs a new VSCodeExtensionError.
   *
   * @constructor
   * @description Creates a new VSCodeExtensionError.
   *
   * @public
   * @memberof Errors.VSCodeExtensionError
   * @example
   * throw new VSCodeExtensionError('An error occurred while working with VS Code extensions.');
   *
   * @param {string} message - The error message.
   * @param {number} [errorCode] - (Optional) A numeric code representing the error.
   */
  constructor(message: string, errorCode?: number) {
    super(message);

    this.name = 'VSCodeExtensionError';
    this.timestamp = new Date();
    this.errorCode = errorCode;

    // Capture the stack trace (if available) to maintain the proper error stack.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VSCodeExtensionError);
    }
  }
}
