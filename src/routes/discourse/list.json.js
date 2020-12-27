import db from '../../utils/database';
import { err, success } from '../../utils/response';

export async function get(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  data.discourses.sort((a, b) => b.dateCreated - a.dateCreated);

  success(res, 200, data.discourses);
}