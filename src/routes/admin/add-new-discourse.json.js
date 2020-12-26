import db from '../../utils/database';
import { err, success } from '../../utils/response';
import { v4 as uuid } from 'uuid';

export async function post(req, res) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const discourses = data.discourses.map(discourse => ({ ...discourse, isActive: false }));

  const id = uuid();
  const newDiscourse = {
    id,
    topic: req.body.topic,
    isActive: true,
    dateCreated: Date.now()
  };
  discourses.push(newDiscourse);
  data.discourses = discourses;
  data.questions[id] = [];

  db.write(data);

  return success(res, 201, newDiscourse);
}