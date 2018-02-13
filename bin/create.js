#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const rimraf = require('rimraf');

const workingPath =typeof process.argv[2] !== 'undefined' ? process.argv[2] : process.cwd();

// Root directory of the project
const rootPath = path.resolve(__dirname, '..', workingPath);

if(!fs.existsSync(rootPath)){
    fs.mkdirSync(rootPath);
}
// Make sure our directory is empty
fs.readdirSync(rootPath).length === 0 || (console.log('Directory is not empty, aborting.') && process.exit(1));

const boilerplateRepoUrl = 'https://github.com/Milanzor/stein-boilerplate.git';
console.log();
console.log('Fetching boilerplate from git');
// Use git to get our boilerplate
spawnSync('git', ['clone', boilerplateRepoUrl, rootPath]);

console.log('Removing project files from boilerplate');

// Remove files we dont want
rimraf.sync(path.join(rootPath, '.git'));
rimraf.sync(path.join(rootPath, 'README.md'));

// Installs package deps
console.log('Installing dependencies, this can take a bit');
spawnSync('yarn', [], {cwd: rootPath});

// Initialize a new git repo
console.log('Running a first-time build');
spawnSync('yarn', ['build:dev'], {cwd: rootPath});

// All done!
console.log('All done!');
console.log('Available commands:');
console.log('- yarn clean => Removes the public dir');
console.log('- yarn build:dev => Build project in development mode');
console.log('- yarn build:prod => Build project in production mode');
console.log('- yarn dev => webpack-dev-server --env.env=dev');
console.log('- yarn watch:dev => Watch project and build in development mode');
console.log('- yarn watch:prod => Watch project and build in production mode');
console.log('- yarn test => Runs all *.test.js files with Mocha');
console.log('- yarn test:watch => Watches all *.test.js and retests on change');
console.log('Have fun!');
