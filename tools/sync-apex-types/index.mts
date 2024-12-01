import simpleGit from 'simple-git';
import * as fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { exit } from 'node:process';

const projectDir = join(dirname(fileURLToPath(import.meta.url)), '../');

const token = process.env['GITHUB_TOKEN']!;
const owner = 'damingerdai';
const repo = 'ngx-apexcharts'; 
const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }

/** Executes the given command in the project directory. */
function exec(command: string): void;
/** Executes the given command in the project directory and returns its stdout. */
function exec(command: string, captureStdout: true): string;
function exec(command: string, captureStdout?: true) {
  const stdout = execSync(command, {
    cwd: projectDir,
    stdio: ['inherit', captureStdout ? 'pipe' : 'inherit', 'inherit'],
  });

  if (captureStdout) {
    process.stdout.write(stdout);
    return stdout.toString().trim();
  }
}

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}


// const git = simpleGit();

// await git.clone(
//     'https://github.com/apexcharts/ng-apexcharts.git',
//     './ng-apexcharts'
// );

const content = await fs.readFile('./ng-apexcharts/projects/ng-apexcharts/src/lib/model/apex-types.ts')
const newContent = `/* eslint-disable */\n${content}`;
await Promise.all([
    fs.writeFile(
        './projects/ngx-apexcharts/src/lib/model/apex-types.ts',
        newContent,
    ),
    fs.writeFile(
        './projects/ngx-apexcharts/signals/apex-types.ts',
        newContent
    )
]);

const ngCmd = 'yarn ng'
exec(`${ngCmd} lint ngx-apexcharts --fix`);
//fs.rmdir('./ng-apexcharts');
const diffResult = exec('git diff --exit-code', true);
if (!diffResult) {
   console.log('No changes detected, skipping it.');

   exit(-1);
}
const currentDate = getFormattedDate();
const branch = `apex-type-pr-${currentDate}`
exec('git config user.name github-actions');
exec('git config user.email github-actions@github.com');
exec('yarn install --frozen-lockfile');
exec('yarn lint:fix');
exec('yarn package && yarn build');
exec(`git checkout ${branch}`);
exec('git add projects/ngx-apexcharts/src/lib/model/apex-types.ts');
exec('git add projects/ngx-apexcharts/signals/apex-types.ts');
exec(`git commit -m "feat: update apex type from upstream on ${currentDate}."`)
console.log('Changes detected')
const data = {
    title: `feat: update apex type from upstream on ${currentDate}.`,
    head: branch,
    base: 'develop',  // 目标分支
};

const resp = await fetch(
    url,
    {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
)
const res = await resp.json();
console.log(res);