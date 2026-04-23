import { EventEmitter } from 'events';
import client from 'vscode-marketplace-client';

// evita warning de listeners en entorno de ejemplo
EventEmitter.defaultMaxListeners = 20;

const extensions = [
  { publisher: 'ms-python', name: 'python' },
  { publisher: 'esbenp', name: 'prettier-vscode' },
  { publisher: 'dbaeumer', name: 'vscode-eslint' },
];

async function run() {
  for (const { publisher, name } of extensions) {
    console.log(`\n▶ ${publisher}.${name}`);

    try {
      const info = await client.getExtensionInfo(publisher, name, []);
      console.log(`Name: ${info.displayName}`);

      const version = await client.getLatestVersion(publisher, name);
      console.log(`Latest: ${version}`);

      const filePath = await client.downloadExtensionVsix(
        publisher,
        name,
        './downloads'
      );

      console.log(`Downloaded: ${filePath}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

run();
