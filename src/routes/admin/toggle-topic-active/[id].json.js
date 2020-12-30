import db from '../../../utils/database';
import { err, success } from '../../../utils/response';

export async function put(req, res) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const topics = data.topics.map(topic => {
    if (topic.id === req.params.id) {
      return { ...topic, isActive: req.body.isActive };
    } else {
      return { ...topic, isActive: false };
    }
  });

  data.topics = topics;
  db.write(data);

  return success(res, 201, req.body.isActive);
}