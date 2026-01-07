import chalk from 'chalk';
import ora from 'ora';
import { getTwitterClient } from '../utils/auth.js';

export default async function whoami() {
  const spinner = ora('fetching account...').start();

  try {
    const client = getTwitterClient();
    const user = await client.v2.me({
      'user.fields': ['created_at', 'description', 'public_metrics', 'verified']
    });

    spinner.stop();

    const { name, username, description, public_metrics: metrics, created_at, verified } = user.data;

    const verifiedBadge = verified ? chalk.blue(' [✓]') : '';
    console.log(`\n${chalk.cyan.bold(`@${username}`)} ${chalk.white(`(${name})`)}${verifiedBadge}`);
    
    if (description) {
      console.log(`${chalk.italic.gray(description)}`);
    }

    console.log(); 

    const stats = [
      `${chalk.blue('Followers:')} ${metrics.followers_count.toLocaleString()}`,
      `${chalk.green('Following:')} ${metrics.following_count.toLocaleString()}`,
      `${chalk.magenta('Tweets:')} ${metrics.tweet_count.toLocaleString()}`
    ].join('  ');
    
    console.log(stats);

    const date = new Date(created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    console.log(`${chalk.gray(`Joined ${date}`)}\n`);

  } catch (error) {
    spinner.fail(chalk.red('failed to fetch account info'));
    console.error(chalk.red(`  ${error.message}`));
  }
}