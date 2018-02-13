#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const rimraf = require('rimraf');


// Root directory of the project
const rootPath = path.resolve(process.cwd());

// Make sure our directory is empty
fs.readdirSync(rootPath).length === 0 || (console.log('Directory is not empty, aborting.') && process.exit(1));

const boilerplateRepoUrl = 'https://github.com/Milanzor/stein-boilerplate.git';

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
console.log('Doing a first-time build');
spawnSync('yarn', ['build:dev'], {cwd: rootPath});


// All done!
console.log('All done, have fun!');
