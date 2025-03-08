import { describe, it, expect } from 'vitest';
import { VSCodeMarketplaceClient } from '../src/index';

describe('VSCodeMarketplaceClient', () => {
  it('should fetch extension info for a valid extension', async () => {
    const extensionInfo = await VSCodeMarketplaceClient.getExtensionInfo(
      'ms-vscode',
      'cpptools',
      [1]
    );
    expect(extensionInfo).toBeDefined();
    expect(extensionInfo.publisher.publisherName).toBe('ms-vscode');
  });

  it('should throw an error for an invalid extension', async () => {
    await expect(
      VSCodeMarketplaceClient.getExtensionInfo(
        'nonexistent',
        'invalid-extension',
        [1]
      )
    ).rejects.toThrow();
  });
});
