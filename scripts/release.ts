import {
   execute,
   indent,
   log,
   readGitignore,
   sleep,
   writeNewPackageJson
} from './modules/functions';
import prompt, { Choice } from 'prompts';

import fg from 'fast-glob';
import pkgJSON from '../package.json';

const root = process.cwd();

interface PromptVal<T> {
   value: T;
}

enum SelectType {
   ByHand,
   SelectFromList
}

async function main() {
   const gitignore = await readGitignore();
   const ignoredList = gitignore.split('\n').filter(Boolean);

   const allFiles = await fg('./**/*', {
      cwd: process.cwd(),
      ignore: ignoredList
      // markDirectories: true
   });

   const fileChoices: Choice[] = allFiles.map((v) => {
      return { title: v, value: v };
   });

   const { value: newVersion }: PromptVal<string> = await prompt({
      type: 'text',
      name: 'value',
      message: 'Select new version',
      initial: pkgJSON.version
   });

   const { value: selectionType }: PromptVal<SelectType> = await prompt({
      type: 'select',
      message: 'How do you want to add files?',
      name: 'value',
      choices: [
         { title: 'Type By Hand', value: SelectType.ByHand },
         { title: 'Select Files From List', value: SelectType.SelectFromList }
      ]
   });

   let gitAddFiles: string[] = [];
   if (selectionType === SelectType.SelectFromList) {
      let { value: files }: PromptVal<string[]> = await prompt({
         type: 'multiselect',
         name: 'value',
         message: `Select files to be pushed`,
         choices: [{ title: 'All Files', value: '.' }, ...fileChoices]
      });
      if (files.length > 1 && files.includes('.')) {
         files = ['.'];
      }
      gitAddFiles = files;
   } else {
      const { value: files }: PromptVal<string> = await prompt({
         type: 'text',
         name: 'value',
         message: `Type files to be pushed`
      });
      gitAddFiles = [files];
   }

   const { value: commitMessage }: PromptVal<string> = await prompt({
      type: 'text',
      name: 'value',
      message: 'Git commit message',
      min: 3
   });

   const { value: branchName }: PromptVal<string> = await prompt({
      type: 'text',
      name: 'value',
      message: 'branch',
      initial: 'main'
   });

   log('Choices you made:', 'yellow');

   log('Version:', 'magenta');
   log(indent(newVersion), 'blue');

   log('Files:', 'magenta');
   for (const file of gitAddFiles) {
      if (file === '.') log(indent('All Files'), 'blue');
      else log(indent(file), 'blue');
   }

   log('Commit Message:', 'magenta');
   log(indent(commitMessage), 'blue');

   log('Branch:', 'magenta');
   log(indent(branchName), 'blue');

   const { value: willBePublished }: PromptVal<boolean> = await prompt({
      type: 'toggle',
      name: 'value',
      message: 'Publish to npm?',
      active: 'yes',
      inactive: 'no',
      initial: false
   });

   const { value: isSure }: PromptVal<boolean> = await prompt({
      type: 'toggle',
      name: 'value',
      message: 'Are you sure to add these changes?',
      active: 'yes',
      inactive: 'no'
   });
   if (!isSure) {
      const { value: doCycle }: PromptVal<boolean> = await prompt({
         type: 'toggle',
         name: 'value',
         message: 'Do you want to make selections again?',
         active: 'yes',
         inactive: 'no',
         initial: false
      });
      if (doCycle) {
         return main();
      }
      return;
   }

   const newPkgJson = { ...pkgJSON, version: newVersion };
   await writeNewPackageJson(newPkgJson);

   // await execute('git', ['add', ...gitAddFiles]);
   // await execute('git', ['commit', '-m', commitMessage]);
   // await execute('git', ['push', 'origin', branchName]);

   if (willBePublished) {
      await execute('npm', ['run', 'build']);
      await sleep(300);
      await execute('npm', ['publish']);
   }
}
main();
