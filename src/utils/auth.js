import { TwitterApi } from 'twitter-api-v2';
import Conf from 'conf';
import chalk from 'chalk';

const config = new Conf({ projectName: 'xhell' });

export function getTwitterClient() {
  const credentials = config.get('credentials');

  if (!credentials) {
    console.log(`\n${chalk.red.bold('not configured.')} Run: ${chalk.cyan('xhell setup')}\n`);
    process.exit(1);
  }

  const client = new TwitterApi({
    appKey: credentials.apiKey,
    appSecret: credentials.apiSecret,
    accessToken: credentials.accessToken,
    accessSecret: credentials.accessSecret,
  });

  return client.readWrite;
}

export { config };