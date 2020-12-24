import db from '../../_database';
import { err, success } from '../../_response'
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function post(req, res) {
	const data = db.read();

	if (data.users.find(user => user.email === req.body.email)) {
		return err(res, 400, 'User with this email already exists');
	}

	const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

	const newUser = {
		id: uuid(),
		...req.body,
		password: passwordHash,
		dateCreated: Date.now()
	};

	data.users.push(newUser);
	db.write(data);

	return success(res, newUser);
}