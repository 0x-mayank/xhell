import ora from 'ora';
import chalk from 'chalk';
import { getTwitterClient, config } from '../utils/auth.js';

export default async function post(text, options) {
  const spinner = ora('posting...').start();
  try {
    const client = getTwitterClient();
    let mediaIds = [];

    if (options.image) {
      spinner.text = 'uploading media...';
      const mediaId = await client.v1.uploadMedia(options.image);
      mediaIds.push(mediaId);
    }

    const tweet = await client.v2.tweet({
      text,
      ...(mediaIds.length && { media: { media_ids: mediaIds } })
    });

    config.set('lastTweetId', tweet.data.id);

    spinner.succeed(chalk.green('Tweet posted!'));
    console.log(chalk.gray(`Link: https://x.com/i/status/${tweet.data.id}`));
  } catch (error) {
    spinner.fail(chalk.red(`Error: ${error.message}`));
  }
}