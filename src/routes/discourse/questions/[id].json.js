import db from '../../../utils/database';
import { err, success } from '../../../utils/response';

export async function get(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const questions = data.questions[req.params.id];

  if (questions) {
    return success(res, 200, questions);
  } else {
    return err(res, 404, 'No questions found for this discourse');
  }
}