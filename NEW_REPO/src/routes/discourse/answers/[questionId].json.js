import { v4 as uuid } from 'uuid';
import db from '../../../utils/database';
import { err, success } from '../../../utils/response';

export async function get(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const answers = data.answers[req.params.questionId];

  if (answers) {
    return success(res, 200, answers);
  } else {
    return err(res, 404, 'No answers found for this question');
  }
}

export async function post(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const answers = data.answers[req.params.questionId];

  const newAnswer = {
    id: uuid(),
    userId: req.session.user.id,
    answer: req.body.answer,
    dateCreated: Date.now()
  };

  answers.push(newAnswer);

  db.write(data);

  return success(res, 201, newAnswer);
}