import db from '../../../../../utils/database';
import { err, success } from '../../../../../utils/response';

export async function get(req, res) {
  if (!req.session.user) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const questions = data.questions[req.params.topicId];
  const users = data.users;

  if (!questions) {
    return err(res, 404, 'Can not find questions for this topic');
  }

  const question = questions.find(question => question.id === req.params.questionId);

  if (!question) {
    return err(res, 404, 'Can not find this question');
  }

  question.beingAnsweredByEmail = question.beingAnsweredBy.map(userId => {
    return users.find(user => user.id === userId).email;
  });

  return success(res, 201, question);
}

export async function post(req, res) {
  if (!req.session.user || !['admin', 'moderator'].includes(req.session.user.role)) {
    return err(res, 403, 'Not authorized for this route');
  }

  const data = db.read();
  const questions = data.questions[req.params.topicId];

  if (!questions) {
    return err(res, 404, 'Can not find questions for this topic');
  }

  const question = questions.find(question => question.id === req.params.questionId);

  if (!question) {
    return err(res, 404, 'Can not find this question');
  }

  question.beingAnsweredBy.push(req.session.user.id);

  db.write(data);

  return success(res, 201, true);
}