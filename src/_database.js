import fs from 'fs';
import path from 'path';

const read = () => {
  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../src/_database.json")));
  return db;
}

const write = data => {
  fs.writeFileSync(path.resolve(__dirname, "../../../src/_database.json"), JSON.stringify(data, null, 2));
}

export default {
  read,
  write
}