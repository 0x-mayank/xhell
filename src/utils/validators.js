import chalk from 'chalk';
import fs from 'fs';

export function validateTweetText(text) {
  if (!text || text.trim().length === 0) {
    console.log(`${chalk.bold.red('tweet text cannot be empty')}`);
    return false;
  }

  if (text.length > 280) {
    console.log(`${chalk.bold.red(`tweet too long (${text.length}/280 chars)`)}`);
    return false;
  }

  return true;
}