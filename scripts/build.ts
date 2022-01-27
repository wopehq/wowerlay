import fse from 'fs-extra';
import { join } from 'path';
import { execute, refactorTypes, sleep } from './modules/functions';

async function main() {
  const root = process.cwd();
  const dist = join(root, 'dist');
  if (await fse.pathExists(dist)) {
    await fse.rm(dist, { recursive: true });
  }

  await execute('npm', ['run', 'script:build']);
  await sleep(300);
  await refactorTypes();
}
main();
