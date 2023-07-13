#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { dirname } from 'path';
import initPackage from './init-package.js';

yargs(hideBin(process.argv))
  .command('init-package <name>', 'initialize a NPM package', () => {}, (argv) => {
    let name = dirname(process.cwd());
    if (argv.name) {
        name = argv.name.toString();
    }

    initPackage(name)
  })
  .demandCommand(1)
  .parse()