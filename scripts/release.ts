import {
  execute,
  getCurrentBranchName,
  indent,
  log,
  readGitignore,
  sleep,
  writeNewPackageJson
} from './modules/functions';
import prompt, { Choice } from 'prompts';

import chalk from 'chalk';
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

enum Purpose {
  OnlyPublish,
  GithubAndMaybePublish
}

async function main() {
  const { value: purpose }: PromptVal<Purpose> = await prompt({
    type: 'select',
    message: 'What do you want to do?',
    name: 'value',
    choices: [
      {
        title: 'Commit and maybe publish.',
        value: Purpose.GithubAndMaybePublish
      },
      { title: 'Only publish.', value: Purpose.OnlyPublish }
    ]
  });

  if (purpose === Purpose.OnlyPublish) {
    return publish(true);
  }

  const gitignore = await readGitignore();
  const ignoredList = gitignore.split('\n').filter(Boolean);

  const allFiles = await fg('./**/*', {
    cwd: process.cwd(),
    ignore: ignoredList
  });

  const fileChoices: Choice[] = allFiles.map((v) => {
    return { title: v, value: v };
  });

  const newVersion = await input('Type new version, default:', pkgJSON.version);

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
    const files = await input('Type files to be pushed');
    gitAddFiles = [files];
  }

  const commitMessage = await input('Type git commit message', undefined, 3);

  const currentBranch = await getCurrentBranchName();
  const branchName = await input('Type branch name you want to push', currentBranch);

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

  const willBePublished = await ask('Publish to npm?');

  const isSure = await ask('Are you sure to add these changes?');
  if (!isSure) {
    return askForReset();
  }

  const newPkgJson = { ...pkgJSON, version: newVersion };
  await writeNewPackageJson(newPkgJson);

  const coloredBranchName = chalk.magentaBright('[', currentBranch + ']');
  log(`Pulling latest state of ${coloredBranchName}`, 'cyan');
  await sleep(300);
  try {
    await execute('git', ['pull', 'origin', currentBranch]);
  } catch (error) {
    log(
      `Failed to pull ${coloredBranchName}, guessing the branch does not exist, skipped pulling`,
      'cyan'
    );
  }

  log('Adding selected files to current commit', 'cyan');
  await sleep(300);
  await execute('git', ['add', ...gitAddFiles]);

  log('Commiting changes', 'cyan');
  await sleep(300);
  await execute('git', ['commit', '-m', commitMessage]);

  log(`Pushing changes to ${coloredBranchName}`, 'cyan');
  await sleep(300);
  await execute('git', ['push', 'origin', branchName]);

  if (willBePublished) {
    await publish();
  }
}

async function publish(askForSure = false) {
  if (askForSure) {
    const isSure = await ask('Are you sure to publish?');
    if (!isSure) {
      return askForReset();
    }
  }

  log(`Publishing to npm`, 'cyan');
  await sleep(500);
  await execute('npm', ['run', 'build']);
  await sleep(300);
  await execute('npm', ['publish']);
}

async function ask(msg: string, initial = false): Promise<boolean> {
  const { value }: PromptVal<boolean> = await prompt({
    type: 'toggle',
    name: 'value',
    message: msg,
    active: 'yes',
    inactive: 'no',
    initial
  });
  return value;
}

async function input(msg: string, initial?: any, min?: number, max?: number) {
  const { value }: PromptVal<string> = await prompt({
    name: 'value',
    message: msg,
    type: 'text',
    initial,
    min,
    max
  });
  return value;
}

async function askForReset() {
  const willReset = await ask('Do you want to select again?');
  if (willReset) {
    log('Restarting CLI', 'cyan');
    await sleep(500);
    return main();
  }
  process.exit();
}

main();
