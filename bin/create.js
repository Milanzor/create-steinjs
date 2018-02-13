#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');
const columnify = require('columnify');

const rimraf = require('rimraf');

const workingPath = typeof process.argv[2] !== 'undefined' ? process.argv[2] : process.cwd();

// Root directory of the project
const rootPath = path.resolve(__dirname, '..', workingPath);

if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath);
}
// Make sure our directory is empty
if (fs.readdirSync(rootPath).length > 0) {
    console.log('Directory is not empty, aborting.');
    process.exit(1);
}

const boilerplateRepoUrl = 'https://github.com/Milanzor/stein-boilerplate.git';

console.log();
console.log('Good day!');
console.log('Fetching boilerplate from Github.');

// Use git to get our boilerplate
spawnSync('git', ['clone', boilerplateRepoUrl, rootPath]);

console.log('Removing git files from boilerplate.');

// Remove files we dont want
rimraf.sync(path.join(rootPath, '.git'));
rimraf.sync(path.join(rootPath, 'README.md'));

// Installs package deps
console.log('Installing dependencies with yarn, this can take a few seconds.');
spawnSync('yarn', [], {cwd: rootPath});

// Initialize a new git repo
console.log('Building project for the first time.');
spawnSync('yarn', ['build:dev'], {cwd: rootPath});

// All done!
console.log('All done!');
console.log();
console.log('Here\'s a list of the available commands:');
console.log();
console.log(
    columnify(
        [
            {
                command: 'yarn clean',
                description: 'Removes the public dir',
            },
            {

                command: 'yarn build:dev',
                description: 'Build project in development mode',
            },
            {

                command: 'yarn build:prod',
                description: 'Build project in production mode',
            },
            {

                command: 'yarn dev',
                description: 'Runs webpack-dev-server in dev mode from ./public',
            },
            {

                command: 'yarn serve',
                description: 'Serve\'s the content from the ./public folder',
            },
            {

                command: 'yarn watch:dev',
                description: 'Watch project and build in development mode',
            },
            {

                command: 'yarn watch:prod',
                description: 'Watch project and build in production mode',
            },
            {

                command: 'yarn test',
                description: 'Runs all *.test.js files with Mocha',
            },
            {

                command: 'yarn test:watch',
                description: 'Watches all *.test.js and retests on change',
            }
        ],
        {
            minWidth: 20,
        }
    )
);

console.log();
console.log('Have fun!');
