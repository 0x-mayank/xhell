import { config } from '../utils/auth.js';
import chalk from 'chalk';
import ora from 'ora';

export default async function logout() {
  const spinner = ora('Logging out...').start();

  try {
    if (!config.has('credentials')) {
      spinner.info(chalk.yellow('you are not currently logged in.'));
      return;
    }

    config.delete('credentials');
    config.delete('lastTweetId');

    spinner.succeed(chalk.green.bold('Logout successful!'));
    console.log(chalk.gray('Your API credentials have been removed from this system.'));
    console.log(chalk.cyan('Run "xhell setup" to log in again.\n'));
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to logout'));
    console.error(chalk.red(`  ${error.message}`));
  }
}