import chalk, { type BackgroundColor, type ForegroundColor } from 'chalk';
import execa, { type Options as ExecaOptions } from 'execa';
import fse from 'fs-extra';

import { join } from 'path';

export function execute(command: string, commandArguments: string[], options?: ExecaOptions) {
  return execa(command, commandArguments, {
    stdio: 'inherit',
    ...options
  });
}

export function log(msg: string, color?: typeof ForegroundColor, bgColor?: typeof BackgroundColor) {
  if (color) {
    msg = chalk[color](msg);
  }
  if (bgColor) {
    msg = chalk[bgColor](msg);
  }
  return console.log(msg);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function refactorTypes() {
  const dist = join(process.cwd(), 'dist');
  const basePath = join(dist, 'src');
  const targetPath = join(dist, 'types');

  const toBeRemovedTypes = [
    'consts.d.ts', //
    'event',
    'utils'
  ];

  if (await fse.pathExists(basePath)) {
    await fse.move(basePath, targetPath);
    for (const directoryOrFileName of toBeRemovedTypes) {
      const path = join(dist, 'types', directoryOrFileName);
      await fse.rm(path, { recursive: true });
    }
    return;
  }
  throw new Error('types folder does not exist');
}
