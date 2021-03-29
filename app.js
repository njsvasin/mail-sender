import { readFile, readFileSync, watch, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { email } from './email/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watchedFile = path.join(__dirname, 'templates', 'index.html');
const counterFile = path.join(__dirname, 'data', 'counter.txt');

let isWatching = false;

const counterData = readFileSync(counterFile, {encoding: 'utf8', flag: 'r'});
let counter = parseInt(String(counterData));


watch(watchedFile, (eventType, filename) => {
  if (isWatching) return;

  isWatching = true;

  console.log(`file ${filename} ${eventType}d`);

  try {
    const watchedFileData = readFileSync(watchedFile, {encoding: 'utf8', flag: 'r'});

    (async function () {
      try {
        await email.send(Object.assign(email.defaults, {
          html: watchedFileData,
          subject: `Test email ${counter}`
        }));
        console.log(`Message sent: ${counter}`);

        counter++;
        writeFileSync(counterFile, String(counter));
        isWatching = false;
      } catch (err) {
        console.log(err);
        isWatching = false;
      }
    })();
  } catch (e) {
    console.log(`Can't read the file ${watchedFile}`);
    console.log(e);
  }
});

