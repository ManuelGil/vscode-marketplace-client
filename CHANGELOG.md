# Change Log

All notable changes to the "VSCode Marketplace Client" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.3] - 2026-06-14

### Fixed

- Resolved `pnpm audit` vulnerabilities affecting transitive dependencies (`fast-uri` and `@conventional-changelog/git-client`) by adding pnpm overrides.
- Fixed CI audit workflow failures caused by security vulnerabilities detected during dependency checks.

### [1.2.2] - 2026-05-06

### Added

- Exported `QueryFlag` from the package entry point.

### Changed

- Improved domain error consistency.
- Reduced redundant marketplace requests during VSIX downloads.

### Fixed

- Improved handling of malformed marketplace responses.
- Updated README examples and installation instructions.

## [1.2.1] - 2026-04-23

### Changed

- Improved HTTP client configuration and request timeout handling.

### Fixed

- Fixed `ENOENT` errors during VSIX downloads by automatically creating output directories.
- Fixed stream handling during downloads using Node.js `pipeline`.
- Reduced `MaxListenersExceededWarning` during multiple sequential downloads.

## [1.2.0] - 2026-04-22

### Changed

- Improved dependency maintenance and project automation.

## [1.1.1] - 2025-09-16

### Changed

- Updated project dependencies for improved stability and security.

## [1.1.0] - 2025-03-21

### Changed

- Improved package metadata and ESM/CJS compatibility.
- Improved bundle optimization and source map generation.

## [1.0.0] - 2025-03-08

### Added

- Initial release of the npm package.

[Unreleased]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.2.3...HEAD
[1.2.3]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/vscode-marketplace-client/releases/tag/v1.0.0
