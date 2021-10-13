import chalk, { BackgroundColor, ForegroundColor } from 'chalk';
import execa, { Options } from 'execa';

import fse from 'fs-extra';
import { join } from 'path';

export function execute(command: string, commandArguments: string[], options?: Options) {
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

export function indent(msg: string) {
   const indentValue = '   ';
   return indentValue + msg;
}

export async function readGitignore() {
   const root = process.cwd();
   return await fse.readFile(join(root, '.gitignore'), 'utf8');
}

export async function writeNewPackageJson(newPKG: typeof import('../../package.json')) {
   const root = process.cwd();
   const stringifiedPackageJSON = JSON.stringify(newPKG, undefined, 3);
   return await fse.writeFile(join(root, 'package.json'), stringifiedPackageJSON);
}

export async function refactorTypes() {
   const dist = join(process.cwd(), 'dist');
   const basePath = join(dist, 'src');
   const targetPath = join(dist, 'types');

   const toBeRemovedTypes = [
      join(dist, 'types', 'plugin'),
      join(dist, 'types', 'event'),
      join(dist, 'types', 'consts.d.ts')
   ];

   if (await fse.pathExists(basePath)) {
      await fse.move(basePath, targetPath);
      for (const path of toBeRemovedTypes) {
         fse.rm(path, { recursive: true });
      }
   }
   throw new Error('types folder does not exist');
}
