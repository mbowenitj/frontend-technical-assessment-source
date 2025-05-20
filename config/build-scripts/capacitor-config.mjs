import { existsSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG_PATHS = {
  android: {
    src: '../capacitor/capacitor.android.ts',
    dest: '../../capacitor.config.ts'
  },
  ios: {
    src: '../capacitor/capacitor.ios.ts',
    dest: '../../capacitor.config.ts'
  }
};

function copyPlatformConfig(platform) {
  const config = CONFIG_PATHS[platform];
  if (!config) {
    console.error('Invalid platform specified. Use "android" or "ios"');
    process.exit(1);
  }

  const srcPath = resolve(__dirname, config.src);
  const destPath = resolve(__dirname, config.dest);

  if (!existsSync(srcPath)) {
    console.error(`Platform config not found: ${srcPath}`);
    process.exit(1);
  }

  try {
    copyFileSync(srcPath, destPath);
    console.log(`Copied ${platform} config to capacitor.config.ts`);
  } catch (error) {
    console.error(`Error copying config: ${error.message}`);
    process.exit(1);
  }
}

const platform = process.argv[2];
if (!platform) {
  console.error('Platform not specified. Use "android" or "ios"');
  process.exit(1);
}

copyPlatformConfig(platform);
