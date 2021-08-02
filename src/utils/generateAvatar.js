import { v4 as uuid } from 'uuid';
import multiavatar from '@multiavatar/multiavatar';
import fs from 'fs';
import path from 'path';
import Logger from 'lib/logger';

const { NODE_ENV } = process.env;

const avatarsFolder = NODE_ENV === 'production'
  ? path.resolve(__dirname, '/mnt/static/avatars')
  : path.resolve(__dirname, '../../../static/avatars');

if (!fs.existsSync(avatarsFolder)) {
  try {
    fs.mkdirSync(avatarsFolder, { recursive: true });
  } catch(e) {
    Logger.error('Incorrect avatars folder is provided.');
  }
}

export default userId => {
  fs.writeFileSync(
    `${avatarsFolder}/${userId}.svg`,
    multiavatar(uuid())
  );
}
