import nconf from 'nconf';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

nconf
	.argv()
	.env()
	.file('file', path.join(__dirname, 'config.json'))
	.file('package_file', path.join(__dirname, '../package.json'));

export const config = nconf;
