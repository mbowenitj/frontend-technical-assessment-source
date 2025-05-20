import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG_PATHS = {
  android: {
    src: 'firebase/google-services.json',
    dest: '../android/app/google-services.json'
  },
  ios: {
    src: 'firebase/GoogleService-Info.plist',
    dest: '../ios/App/App/GoogleService-Info.plist'
  }
};

function copyConfig(platform) {
  const config = CONFIG_PATHS[platform];
  if (!config) return;

  const srcPath = resolve(__dirname, '..', config.src);
  const destPath = resolve(__dirname, '..', config.dest);

  if (!existsSync(srcPath)) {
    console.error('Firebase config not found: ' + srcPath);
    process.exit(1);
  }

  mkdirSync(dirname(destPath), { recursive: true });
  copyFileSync(srcPath, destPath);
  console.log('Copied Firebase config for ' + platform);
}

const platform = process.argv[2];
if (platform) {
  copyConfig(platform);
} else {
  Object.keys(CONFIG_PATHS).forEach((platform) => {
    copyConfig(platform);
  });
}
