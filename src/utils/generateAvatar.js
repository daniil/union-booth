import { v4 as uuid } from 'uuid';
import multiavatar from '@multiavatar/multiavatar';
import fs from 'fs';
import path from 'path';

const { NODE_ENV } = process.env;

const avatarsFolder = NODE_ENV === 'production'
  ? path.resolve(__dirname, '/mnt/static/avatars')
  : path.resolve(__dirname, '../../../static/avatars');

if (!fs.existsSync(avatarsFolder)){
  fs.mkdirSync(avatarsFolder, { recursive: true });
}

console.log('=== AVATARS FOLDER ===');
fs.readdirSync(avatarsFolder).forEach(file => {
  console.log(file);
});

console.log('=== MOUNT FOLDER ===');
try {
  fs.readdirSync(path.resolve(__dirname, '/mnt/static')).forEach(file => {
    console.log(file);
  });
} catch(e) {
  console.log(`Can't read: ${process.cwd() }`)
}


export default userId => {
  fs.writeFileSync(
    `${avatarsFolder}/${userId}.svg`,
    multiavatar(uuid())
  );
}
