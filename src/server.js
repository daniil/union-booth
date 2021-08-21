import 'dotenv/config';
import path from 'path';
import polka from 'polka';
import compression from 'compression';
import cors from 'cors';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import serveStatic from 'serve-static';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { v4 as uuid } from 'uuid';
import helmet from 'helmet';
import graphQLServer from 'graphql/server';
import { initSSRClient } from 'graphql/ssr-client';
import { sequelize } from 'graphql/models';
import Logger from 'lib/logger';
import morganMiddleware from 'lib/morgan';

const app = polka();

const { ENV_TYPE, SERVER_URL, PORT, NODE_ENV, SESSION_SECRET } = process.env;
const prod = NODE_ENV === 'production';
const httpProtocol = prod ? 'https' : 'http';
let serveStaticPath;

if (ENV_TYPE === 'qovery') {
	serveStaticPath = '/mnt/static';
} else {
	// Custom production config
	serveStaticPath = '/root/union-booth/static';
}

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
		retries: 0,
		logFn: message => Logger.info(message)
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
			origin: [`${httpProtocol}://${SERVER_URL}:${PORT}`],
			credentials: true
		}),
		morganMiddleware,
		sessionMiddleware,
		nonceMiddleware,
		helmetMiddleware,
		compression({ threshold: 0 }),
		serveStatic(prod ? path.resolve(__dirname, serveStaticPath) : 'static'),
		serveStatic(path.resolve(__dirname, '../../../static')),
		sapper.middleware({
			ignore: ['/graphql'],
			session: req => {
				return ({
					user: req.session.user,
					SERVER_URL,
					PORT,
					prod,
					apolloClient: initSSRClient(req.session)
				});
			}
		})
	);

const httpServer = graphQLServer.init(app);

httpServer.listen(PORT, () => {
	Logger.info(`🚀 Apollo Server running on ${httpProtocol}://${SERVER_URL}:${PORT}/graphql`);
});

sequelize.authenticate().then(() => {
	Logger.info('🚀 Sequelize connection has been established successfully.');
}).catch(() => {
	Logger.error('🚫 Sequelize could not connect to PostgreSQL. Check your connection settings');
});
