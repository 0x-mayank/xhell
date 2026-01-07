import { getTwitterClient, config } from '../utils/auth.js';
import chalk from 'chalk';

export default async function undo() {
  const lastId = config.get('lastTweetId');
  if (!lastId) return console.log(chalk.yellow('no recent tweet found to undo.'));

  try {
    const client = getTwitterClient();
    await client.v2.deleteTweet(lastId);
    config.delete('lastTweetId');
    console.log(chalk.green('last tweet deleted.'));
  } catch (e) {
    console.error(chalk.red('failed to undo:', e.message));
  }
}