import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import { v4 as uuid } from 'uuid';
import helmet from 'helmet';

const app = polka();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const nonceMiddleware = (_req, res, next) => {
	res.locals = {};
	res.locals.nonce = uuid();
	next();
};

const helmetMiddleware = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'", "blob: *"],
			scriptSrc: [
				"'self'",
				"blob: *",
				(_req, res) => `'nonce-${res.locals.nonce}'`
			]
		}
	}
});

app
	.use(
		json(),
		nonceMiddleware,
		helmetMiddleware,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
