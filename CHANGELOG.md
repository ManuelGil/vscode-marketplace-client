# Change Log

All notable changes to the "VSCode Marketplace Client" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] - 2026-04-23

### Changed

- Improved HTTP client configuration with Axios and custom HTTPS agent.
- Added timeout configuration to network requests.

### Fixed

- Fixed `ENOENT` error when downloading VSIX files by ensuring output directories are created automatically.
- Fixed stream handling during downloads using Node.js `pipeline`.
- Reduced `MaxListenersExceededWarning` during multiple sequential downloads.

## [1.2.0] - 2026-04-22

### Added

- Integración de CI (GitHub Actions) para auditoría mensual de dependencias con npm.

### Changed

- Update dependencies to their latest versions for improved performance and security.

## [1.1.1] - 2025-09-16

### Changed

- Update dependencies to their latest versions for improved performance and security.

## [1.1.0] - 2025-03-21

### Changed

- Enhance `package.json` metadata to improve the build process and ensure compatibility ESM and CJS.
- Update `CHANGELOG.md` to include the new versioning format.
- Update `tsconfig.json` to exclude of `declarations` for improved build performance.
- Update `tsup.config.ts` to enable `treeshake` and `sourcemap` options for better performance and smaller bundle size.

## [1.0.0] - 2025-03-08

### Added

- Initial release of the npm package.

[Unreleased]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.2.1...HEAD
[1.2.1]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/ManuelGil/vscode-marketplace-client/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/vscode-marketplace-client/releases/tag/v1.0.0
