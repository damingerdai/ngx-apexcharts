import simpleGit from 'simple-git';

const git = simpleGit();

const repos = await git.clone("https://github.com/apexcharts/ng-apexcharts.git", "./ng-apexcharts");

console.log(repos);

