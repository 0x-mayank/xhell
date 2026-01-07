import { program } from 'commander';
import setupCommand from './commands/setup.js';
import postCommand from './commands/post.js';
import whoamiCommand from './commands/whoami.js';
import undoCommand from './commands/undo.js';
import { saveDraft, listDrafts } from './commands/draft.js';

program
  .name('xhell')
  .description('a cli for twitter/X')
  .version('1.0.0');

program
  .command('setup')
  .description('configure X API credentials')
  .action(setupCommand);

program
  .command('post <text>')
  .description('Post a new tweet')
  .option('-i, --image <path>', 'Path to image file')
  .action((text, options) => {
    postCommand(text, options);
  });

program
  .command('undo')
  .description('delete the last posted tweet')
  .action(undoCommand);

program
  .command('draft <text>')
  .description('save a draft tweet')
  .action(saveDraft);

program
  .command('drafts')
  .description('list all saved draft tweets')
  .action(listDrafts);

program
  .command('whoami')
  .description('show your X account info')
  .action(whoamiCommand);

program.parse(process.argv);