# VSCode Marketplace Client

[![NPM Version](https://img.shields.io/npm/v/vscode-marketplace-client?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/vscode-marketplace-client)
[![NPM Downloads](https://img.shields.io/npm/dt/vscode-marketplace-client?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/vscode-marketplace-client)
[![GitHub Repo Stars](https://img.shields.io/github/stars/ManuelGil/vscode-marketplace-client?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-marketplace-client)
[![GitHub License](https://img.shields.io/github/license/ManuelGil/vscode-marketplace-client?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-marketplace-client/blob/main/LICENSE)

## Overview

**VSCode Marketplace Client** is a powerful Node.js library that provides an easy-to-use interface for interacting with the Visual Studio Code Marketplace API. With it, you can query detailed extension information, retrieve specific or the latest versions, obtain download URLs, and even programmatically download VSIX packages.

Whether you're building tools to manage VS Code extensions or integrating marketplace data into your application, this client offers a modular, extensible solution with clear error handling and advanced query configuration.

## Index

- [VSCode Marketplace Client](#vscode-marketplace-client)
  - [Overview](#overview)
  - [Index](#index)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Querying Extension Information](#querying-extension-information)
    - [Retrieving Extension Versions](#retrieving-extension-versions)
    - [Downloading VSIX Files](#downloading-vsix-files)
    - [Using Query Flags](#using-query-flags)
    - [Analyzing Extension Information \& Error Handling Example](#analyzing-extension-information--error-handling-example)
  - [API Reference](#api-reference)
    - [VSCodeMarketplaceClient](#vscodemarketplaceclient)
  - [Error Handling](#error-handling)
  - [Support](#support)
  - [Feedback](#feedback)
  - [Follow Me](#follow-me)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [License](#license)

## Features

- **Query Extension Information:**
  Obtain detailed information about an extension using its publisher and name.

- **Retrieve Specific or Latest Versions:**
  Fetch details for a specific version or simply retrieve the latest available version.

- **Download VSIX Files:**
  Automatically download the VSIX package corresponding to the latest version of the extension.

- **Modular and Extensible Design:**
  Built following SOLID principles, making it easy to extend and integrate into your projects.

- **Advanced Query Configuration:**
  Customize your queries using _Query Flags_. These flags are defined as literal numeric values that determine which information is retrieved from the published extensions.
  **Note:** Use the numbers directly (e.g., `[1, 256]`) without mapping or enums.

- **Clear Error Handling:**
  Uses custom error classes to provide precise feedback in case of failures.

## Installation

Install the package using npm:

```bash
npm install vscode-marketplace-client
```

## Usage

Below are some examples to help you get started:

### Querying Extension Information

```typescript
import { VSCodeMarketplaceClient } from 'vscode-marketplace-client';

(async () => {
  try {
    const extensionInfo = await VSCodeMarketplaceClient.getExtensionInfo(
      'ms-vscode',
      'cpptools',
      [1, 256], // Example: 1 for IncludeVersions, 256 for IncludeStatistics
    );
    console.log('Extension Info:', extensionInfo);
  } catch (error) {
    console.error('Error fetching extension info:', error);
  }
})();
```

### Retrieving Extension Versions

```typescript
import { VSCodeMarketplaceClient } from 'vscode-marketplace-client';

(async () => {
  try {
    // Retrieve the latest version
    const latestVersion = await VSCodeMarketplaceClient.getLatestVersion(
      'ms-vscode',
      'cpptools',
    );
    console.log('Latest Version:', latestVersion);

    // Retrieve a specific version
    const specificVersion = await VSCodeMarketplaceClient.getExtensionVersion(
      'ms-vscode',
      'cpptools',
      '1.2.3',
    );
    console.log('Specific Version:', specificVersion);
  } catch (error) {
    console.error('Error retrieving extension version:', error);
  }
})();
```

### Downloading VSIX Files

```typescript
import { VSCodeMarketplaceClient } from 'vscode-marketplace-client';

(async () => {
  try {
    const vsixFilePath = await VSCodeMarketplaceClient.downloadExtensionVsix(
      'ms-vscode',
      'cpptools',
      './downloads',
    );
    console.log('VSIX downloaded to:', vsixFilePath);
  } catch (error) {
    console.error('Error downloading VSIX:', error);
  }
})();
```

### Using Query Flags

The `QueryFlag` type is defined as a union of numeric literals. You can pass these numeric values directly when calling methods. For example:

```typescript
// The QueryFlag type is defined as:
// type QueryFlag = 0 | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 16863 | 32768;
import { VSCodeMarketplaceClient, QueryFlag } from 'vscode-marketplace-client';

const flags: QueryFlag[] = [1, 256]; // 1: IncludeVersions, 256: IncludeStatistics
const combinedFlags = flags.reduce((acc, flag) => acc | flag, 0);
console.log('Combined Flags:', combinedFlags);
```

For more details, refer to the [official documentation](https://learn.microsoft.com/en-us/javascript/api/azure-devops-extension-api/extensionqueryflags).

### Analyzing Extension Information & Error Handling Example

This example demonstrates how to analyze extension information and handle errors using our custom error classes.

```typescript
import {
  VSCodeMarketplaceClient,
  VSCodeExtensionError,
  ExtensionNotFoundError,
  VersionNotFoundError,
  VsixFileNotFoundError,
} from 'vscode-marketplace-client';

(async () => {
  try {
    // Retrieve detailed extension information from the marketplace
    const extensionInfo = await VSCodeMarketplaceClient.getExtensionInfo(
      'ms-vscode',
      'cpptools',
      [1, 256], // 1: IncludeVersions, 256: IncludeStatistics
    );

    // Analyze and log extension details
    console.log(`Extension: ${extensionInfo.displayName}`);
    console.log(`Publisher: ${extensionInfo.publisher.publisherName}`);
    console.log(`Total Versions: ${extensionInfo.versions.length}`);

    // List all available versions
    extensionInfo.versions.forEach((version, index) => {
      console.log(`Version ${index + 1}: ${version.version}`);
    });

    // Retrieve a specific version (for example, version '1.2.3')
    const specificVersion = await VSCodeMarketplaceClient.getExtensionVersion(
      'ms-vscode',
      'cpptools',
      '1.2.3',
    );
    console.log(`Retrieved Specific Version: ${specificVersion.version}`);
  } catch (error) {
    // Handle custom errors for precise error management
    if (error instanceof ExtensionNotFoundError) {
      console.error('Extension not found:', error.message);
    } else if (error instanceof VersionNotFoundError) {
      console.error('Specified version not found:', error.message);
    } else if (error instanceof VsixFileNotFoundError) {
      console.error('VSIX file not found:', error.message);
    } else if (error instanceof VSCodeExtensionError) {
      console.error('A VSCode extension error occurred:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
})();
```

## API Reference

### VSCodeMarketplaceClient

- **getExtensionInfo(publisher: string, extension: string, flags: QueryFlag[]): Promise<ExtensionInfo>**
  Retrieves detailed information about the extension.

- **getExtensionVersion(publisher: string, extension: string, version?: string): Promise<ExtensionVersion>**
  Returns details for a specific extension version, or the latest version if none is specified.

- **getLatestVersion(publisher: string, extension: string): Promise<string>**
  Returns the latest version as a string.

- **getVsixDownloadUrl(publisher: string, extension: string): Promise<string>**
  Retrieves the download URL for the VSIX package.

- **downloadExtensionVsix(publisher: string, extension: string, outputDir?: string): Promise<string>**
  Downloads the VSIX file and saves it to the specified directory.

## Error Handling

The package uses custom error classes for precise error handling:

- **VSCodeExtensionError:** Base error class for VS Code extension-related issues.
- **ExtensionNotFoundError:** Thrown when the requested extension is not found.
- **VersionNotFoundError:** Thrown when a specified version is not found.
- **VsixFileNotFoundError:** Thrown when the corresponding VSIX file cannot be located.

Example usage:

```typescript
try {
  // Some operation...
} catch (error) {
  if (error instanceof VSCodeExtensionError) {
    // Handle VS Code extension specific errors
  } else {
    // General error handling
  }
}
```

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/ManuelGil/vscode-marketplace-client/issues) on GitHub.

## Feedback

If you enjoy using **VSCode Marketplace Client**, please consider leaving a review on [GitHub](https://github.com/ManuelGil/nspin) or sharing your feedback.

## Follow Me

Stay updated on the latest features, improvements, and future projects by following me:

- [GitHub](https://github.com/ManuelGil)
- [Twitter (X)](https://twitter.com/imgildev)

## Contributing

We welcome contributions from the community! To contribute, fork the [GitHub repository](https://github.com/ManuelGil/vscode-marketplace-client) and submit a pull request.

Before contributing, please review our [Contribution Guidelines](./CONTRIBUTING.md) for details on coding standards and best practices.

## Code of Conduct

We strive to create a welcoming, inclusive, and respectful environment for all contributors. Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in this project.

## Changelog

See the full list of changes in the [CHANGELOG.md](./CHANGELOG.md) file.

## License

This extension is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/MIT) for more details.
