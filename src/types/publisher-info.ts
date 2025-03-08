/**
 * PublisherInfo represents information about a publisher.
 *
 * @interface PublisherInfo
 * @description Represents information about a publisher.
 *
 * @public
 * @memberof Types
 * @example
 * const publisherInfo = await vscode.getPublisherInfo('ms-vscode');
 * console.log(publisherInfo.displayName);
 *
 * @param {string} publisherId - The publisher identifier.
 * @param {string} publisherName - The publisher name.
 * @param {string} displayName - The display name.
 * @param {string} flags - The flags.
 * @param {string} domain - The domain.
 * @param {boolean} isDomainVerified - Indicates if the domain is verified.
 *
 * @returns {PublisherInfo} The publisher information.
 */
export interface PublisherInfo {
  publisherId: string;
  publisherName: string;
  displayName: string;
  flags: string;
  domain: string;
  isDomainVerified: boolean;
}
