import morgan from 'morgan';
import Logger from 'lib/logger';

const stream = {
  write: message => Logger.http(message.substring(0, message.lastIndexOf('\n')))
};

morgan.token('graphql-query', req => req.body.query && `\nGraphQL ${req.body.query}`);

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms :graphql-query',
  { stream }
);

export default morganMiddleware;