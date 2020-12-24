import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { v4 as uuid } from 'uuid';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = polka();

const { PORT, NODE_ENV, SESSION_SECRET } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = new sessionFileStore(session);

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
		session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: `.sessions`
      })
    }),
		nonceMiddleware,
		helmetMiddleware,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
      session: (req) => {
        return ({
          user: req.session.user
				});
			}
    })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
