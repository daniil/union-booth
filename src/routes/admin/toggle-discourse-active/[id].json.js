import db from '../../../utils/database';
import { err, success } from '../../../utils/response';

export async function put(req, res) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const discourses = data.discourses.map(discourse => {
    if (discourse.id === req.params.id) {
      return { ...discourse, isActive: req.body.isActive };
    } else {
      return { ...discourse, isActive: false };
    }
  });

  data.discourses = discourses;
  db.write(data);

  return success(res, 201, req.body.isActive);
}