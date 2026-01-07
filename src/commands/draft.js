import { config } from '../utils/auth.js';
import chalk from 'chalk';

export function saveDraft(text) {
  const drafts = config.get('drafts') || [];
  drafts.push({ text, date: new Date().toISOString() });
  config.set('drafts', drafts);
  console.log(chalk.green('saved to drafts.'));
}

export function listDrafts() {
  const drafts = config.get('drafts') || [];
  if (!drafts.length) return console.log('no drafts found.');
  
  drafts.forEach((d, i) => {
    console.log(`${chalk.yellow(i + 1)}: ${d.text.substring(0, 50)}...`);
  });
}