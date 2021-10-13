import { execute, refactorTypes, sleep } from './modules/functions';

import fse from 'fs-extra';
import { join } from 'path';

async function main() {
   const root = process.cwd();
   const dist = join(root, 'dist');
   if (await fse.pathExists(dist)) {
      await fse.rm(dist, { recursive: true });
   }

   await execute('npm', ['run', 'build']);
   await sleep(300);
   await refactorTypes();
}
main();
