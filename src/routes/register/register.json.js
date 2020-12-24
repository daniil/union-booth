import db from '../../_database';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async password => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds, function(err, hash) {
			if (err) return reject(err);
			resolve(hash);
		});
	});
}

export async function post(req, res) {
	const data = db.read();

	if (data.users.find(user => user.email === req.body.email)) {
		res.writeHead(400, {
      'Content-Type': 'application/json'
    });
    let json = JSON.stringify({ error: 'User with this email already exists' });
    res.end(json);
	}

	const passwordHash = await hashPassword(req.body.password);

	const newUser = {
		id: uuid(),
		...req.body,
		password: passwordHash,
		dateCreated: Date.now()
	};

	data.users.push(newUser);
	db.write(data);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(newUser));
}