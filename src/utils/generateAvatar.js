import { v4 as uuid } from 'uuid';
import multiavatar from '@multiavatar/multiavatar';
import fs from 'fs';
import path from 'path';

const { NODE_ENV } = process.env;

const avatarsFolder = NODE_ENV === 'production'
  ? path.resolve(__dirname, '/mnt/static/avatars')
  : path.resolve(__dirname, '../../../static/avatars');

if (!fs.existsSync(avatarsFolder)) {
  try {
    fs.mkdirSync(avatarsFolder, { recursive: true });
  } catch(e) {
    console.log('Incorrect avatars folder is provided.');
  }
}

export default userId => {
  fs.writeFileSync(
    `${avatarsFolder}/${userId}.svg`,
    multiavatar(uuid())
  );
}
