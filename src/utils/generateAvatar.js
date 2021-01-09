import { v4 as uuid } from 'uuid';
import multiavatar from '@multiavatar/multiavatar';
import fs from 'fs';
import path from 'path';

export default userId => {
  fs.writeFileSync(
    path.resolve(__dirname, `../../../static/avatars/${userId}.svg`),
    multiavatar(uuid())
  );
}