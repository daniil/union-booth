import { v4 as uuid } from 'uuid';
import multiavatar from '@multiavatar/multiavatar';
import fs from 'fs';
import path from 'path';

const avatarsFolder = path.resolve(__dirname, '../../../static/avatars');

if (!fs.existsSync(avatarsFolder)){
  fs.mkdirSync(avatarsFolder);
}

export default userId => {
  fs.writeFileSync(
    `${avatarsFolder}/${userId}.svg`,
    multiavatar(uuid())
  );
}