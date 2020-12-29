import { v4 as uuid } from 'uuid';
import db from '../../../utils/database';
import { err, success } from '../../../utils/response';

export async function get(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const questions = data.questions[req.params.discourseId];

  if (questions) {
    return success(res, 200, questions);
  } else {
    return err(res, 404, 'No questions found for this discourse');
  }
}

export async function post(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const questions = data.questions[req.params.discourseId];

  const id = uuid();
  const newQuestion = {
    id,
    userId: req.session.user.id,
    isAnonymous: req.body.isAnonymous,
    question: req.body.question,
    beingAnsweredBy: [],
    isAnswered: false,
    dateCreated: Date.now()
  };

  questions.push(newQuestion);
  data.answers[id] = [];

  db.write(data);

  success(res, 201, newQuestion);
}