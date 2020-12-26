import db from '../../utils/database';
import { err, success } from '../../utils/response';
import { v4 as uuid } from 'uuid';

export async function post(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const questions = data.questions[req.body.discourseId];

  const newQuestion = {
    id: uuid(),
    userId: req.session.user.id,
    isAnonymous: req.body.isAnonymous,
    question: req.body.question,
    dateCreated: Date.now()
  };

  questions.push(newQuestion);

  db.write(data);

  success(res, 201, newQuestion);
}