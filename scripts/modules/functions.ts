import chalk, { type BackgroundColor, type ForegroundColor } from 'chalk';
import execa, { type Options as ExecaOptions } from 'execa';
import fse from 'fs-extra';

import { join } from 'path';

export function execute(command: string, commandArguments: string[], options?: ExecaOptions) {
  return execa(command, commandArguments, {
    stdio: 'inherit',
    ...options,
  });
}

export function log(
  _msg: string,
  color?: typeof ForegroundColor,
  bgColor?: typeof BackgroundColor,
) {
  let msg = _msg;
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

  const toBeRemovedTypes = ['utils'];

  if (await fse.pathExists(basePath)) {
    await fse.move(basePath, targetPath);
    const typeRemovePromises = [] as Promise<unknown>[];

    for (const directoryOrFileName of toBeRemovedTypes) {
      const path = join(dist, 'types', directoryOrFileName);
      typeRemovePromises.push(fse.rm(path, { recursive: true }));
    }

    await Promise.all(typeRemovePromises);
    return;
  }
  throw new Error('types folder does not exist');
}
