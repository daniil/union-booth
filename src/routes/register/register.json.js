import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import db from '../../utils/database';
import { err, success } from '../../utils/response';

const saltRounds = 10;

export async function post(req, res, next) {
	const data = db.read();

	if (data.users.find(user => user.email === req.body.email)) {
		return err(res, 400, 'User with this email already exists');
	}

	const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

	const newUser = {
		id: uuid(),
		...req.body,
		password: passwordHash,
		role: 'user',
		dateCreated: Date.now()
	};

	data.users.push(newUser);
	db.write(data);

	req.session.user = newUser;

	return success(res, 201, newUser);
}