import inquirer from 'inquirer';
import chalk from 'chalk';
import { config } from '../utils/auth.js';

export default async function setup() {
  console.log(`\n${chalk.blue.bold('— xhell Setup Wizard')}`);
  console.log(`${chalk.gray('Get credentials:')} ${chalk.cyan.underline('https://developer.x.com/en/portal/dashboard')}\n`);

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'apiKey',
      message: chalk.yellow('Twitter API Key:'),
      validate: (i) => i.length > 0 || 'Required',
    },
    {
      type: 'password',
      name: 'apiSecret',
      message: chalk.yellow('Twitter API Secret:'),
      mask: '*',
      validate: (i) => i.length > 0 || 'Required',
    },
    {
      type: 'input',
      name: 'accessToken',
      message: chalk.yellow('Access Token:'),
      validate: (i) => i.length > 0 || 'Required',
    },
    {
      type: 'password',
      name: 'accessSecret',
      message: chalk.yellow('Access Token Secret:'),
      mask: '*',
      validate: (i) => i.length > 0 || 'Required',
    },
  ]);

  try {
    config.set('credentials', {
      apiKey: answers.apiKey,
      apiSecret: answers.apiSecret,
      accessToken: answers.accessToken,
      accessSecret: answers.accessSecret,
    });

    console.log(`\n${chalk.green.bold('setup complete!')}`);
    console.log(`${chalk.gray('configuration saved globally.')}`);
    
    console.log(`\n${chalk.yellow.bold('next steps:')}`);
    console.log(`  ${chalk.cyan('xhell whoami')}\n`);

  } catch (error) {
    console.log(`\n${chalk.red.bold('failed to save configuration')}`);
    console.error(chalk.red(error.message));
  }
}