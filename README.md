# Chrome Extension Boilerplate

This project is a Chrome extension template built using Rollup and TypeScript. It includes a development and production-ready setup with the following features:

- `Rollup` for bundling JavaScript and TypeScript files.
- `TypeScript` for type-safe development.
- `PostCSS` with `cssnano` for CSS optimization.
- `HTML and CSS minification` for production builds.
- `Alias` support for cleaner import paths.
- `Automatic asset copying` to the build directory.

## Manifest (Version 3) Details

The `manifest.json` file is configured as follows:

- **`manifest_version`**: Version 3, which is the latest manifest version for Chrome extensions.
- **`name`**: The name of the extension.
- **`description`**: A brief description of the extension.
- **`version`**: The current version of the extension.
- **`icons`**: Icon images for different sizes (16x16, 32x32, 48x48, 128x128).
- **`background`**:
  - **`service_worker`**: Specifies the background service worker script (`background-worker.js`).
- **`content_scripts`**:
  - **`matches`**: Specifies the URLs where the content script (`content-script.js`) will be injected. Currently set to `<all_urls>`.
- **`action`**:
  - **`default_popup`**: Specifies the HTML file for the popup UI.
  - **`default_icon`**: Specifies the icons for the popup action.
- **`permissions`**:
  - **`activeTab`**: Allows the extension to interact with the currently active tab.
  - **`scripting`**: Grants permissions for injecting scripts.

## Rollup Configuration

- Input files:
  - `background-worker.ts`: Background script for the extension.
  - `popup-script.ts`: Script for the popup page.
  - `content-script.ts`: Script for content injection.

- Output:
  - Bundled files in CommonJS format with source maps for production.

- Plugins:
  - `rollup-plugin-delete`: Cleans the build directory before each build.
  - `@rollup/plugin-node-resolve`: Resolves modules from node_modules.
  - `rollup-plugin-typescript2`: Integrates TypeScript with Rollup.
  - `@rollup/plugin-alias`: Allows the use of aliases in imports.
  - `rollup-plugin-postcss`: Processes and minifies CSS files.
  - `rollup-plugin-copy`: Copies static assets to the build directory.
  - `rollup-plugin-progress`: Shows build progress in the console.
  - `@rollup/plugin-terser`: Minifies JavaScript for production.

## Installation and Running

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/)

### Procedures

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository

    ```sh
        git clone https://github.com/BUMBAIYA/chrome-extension-template.git
    ```

3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `manifest.json`.
5. Run `pnpm install` to install the dependencies.
6. Run `pnpm run build` which will also create a zip file in zip directory.
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

## Resources

- [Rollup documentation](https://rollupjs.org/configuration-options/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)
