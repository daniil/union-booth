import db from '../../utils/database';
import { err, success } from '../../utils/response';
import bcrypt from 'bcrypt';

export async function post(req, res) {
  const data = db.read();
  const user = data.users.find(user => user.email === req.body.email);

  if (!user) {
    return err(res, 404, 'User with this email was not found');
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return err(res, 403, 'Username and password do not match');
  }

  req.session.user = user;

	return success(res, 200, user);
}