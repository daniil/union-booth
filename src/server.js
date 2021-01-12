import 'dotenv/config';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { v4 as uuid } from 'uuid';
import helmet from 'helmet';
import graphQLServer from './graphql/server';
import { initSSRClient } from './graphql/ssr-client';
import { sequelize } from './graphql/models';

const app = polka();

const { SERVER_URL, PORT, NODE_ENV, SESSION_SECRET } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = new sessionFileStore(session);

const sessionMiddleware = session({
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 31536000
	},
	store: new FileStore({
		path: '.sessions',
		retries: 0
	})
});

const nonceMiddleware = (_req, res, next) => {
	res.locals = {};
	res.locals.nonce = uuid();
	next();
};

const helmetMiddleware = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'", "blob: *"],
			styleSrc: [
				"'self'",
				"blob: *",
				"'unsafe-inline'"
			],
			scriptSrc: [
				"'self'",
				"blob: *",
				"'sha256-PT+YOJyhu3IamY7Pf1cnvQbDxlHIK2FjqtA7GQoyN5U='",
				(_req, res) => `'nonce-${res.locals.nonce}'`
			]
		}
	}
});

app
	.use(
		json(),
		cors({
			origin: [`http://${SERVER_URL}:${PORT}`],
			credentials: true
		}),
		morgan('dev'),
		sessionMiddleware,
		nonceMiddleware,
		helmetMiddleware,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			ignore: ['/graphql'],
			session: req => {
				return ({
					user: req.session.user,
					SERVER_URL,
					PORT,
					apolloClient: initSSRClient(req.session)
				});
			}
		})
	);

const httpServer = graphQLServer.init(app);

httpServer.listen(PORT, () => {
	console.log(`🚀 Apollo Server running on http://${SERVER_URL}:${PORT}/graphql`);
});

sequelize.authenticate().then(() => {
	console.log('🚀 Sequelize connection has been established successfully.');
}).catch(err => {
	console.log('🚫 Sequelize could not connect to PostgreSQL. Check your connection settings');
});
