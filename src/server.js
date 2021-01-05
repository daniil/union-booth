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
import graphQLServer from './graphql';
import { sequelize } from './graphql/models';

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
			styleSrc: [
				"'self'",
				"blob: *",
				"'unsafe-inline'"
			],
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
		cors({
			origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
			credentials: true
		}),
		morgan('dev'),
		session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
				path: `.sessions`,
				retries: 0
      })
    }),
		nonceMiddleware,
		helmetMiddleware,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			ignore: ['/graphql'],
      session: req => {
        return ({
          user: req.session.user
				});
			}
    })
	);

const httpServer = graphQLServer.init(app);

httpServer.listen(PORT, () => {
	console.log(`🚀 Apollo Server running on http://localhost:${PORT}/graphql`);
});

sequelize.authenticate().then(() => {
	console.log('🚀 Sequelize connection has been established successfully.');
});
