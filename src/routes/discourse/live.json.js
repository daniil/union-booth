import db from '../../utils/database';
import { err, success } from '../../utils/response';

export async function get(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const live = data.discourses.find(discourse => discourse.isActive);

  success(res, 200, live ? live : null);
}