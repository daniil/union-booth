import db from '../../utils/database';
import { err, success } from '../../utils/response';

export async function get(req,res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const topic = data.discourses.find(discourse => discourse.id === req.params.id);

  if (topic) {
    success(res, 200, topic);
  } else {
    return err(res, 404, 'Can not find this discourse');
  }
}