import db from '../../../../../utils/database';
import { err, success } from '../../../../../utils/response';
import mapQuestionStatus from '../../../_mapQuestionStatus';

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

  mapQuestionStatus(users, question);

  return success(res, 201, question);
}