import { v4 as uuid } from 'uuid';
import db from '../../utils/database';
import { err, success } from '../../utils/response';

export async function post(req, res) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const topics = data.topics.map(topic => ({ ...topic, isActive: false }));

  const id = uuid();
  const newTopic = {
    id,
    title: req.body.topic,
    isActive: true,
    dateCreated: Date.now()
  };
  topics.push(newTopic);
  data.topics = topics;
  data.questions[id] = [];

  db.write(data);

  return success(res, 201, newTopic);
}