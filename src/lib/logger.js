import * as winston from 'winston';
import 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

const dailyTransportConfig = {
  datePattern: 'YYYY-MM-DD',
  dirname: './logs',
  maxFiles: '7d',
  colorize: false
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const httpFilter = winston.format((info) => { 
	return info.level === 'http' ? info : false 
})

const transports = [
  new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize({ all: true })
    )
  }),
  
  new winston.transports.DailyRotateFile({
    ...dailyTransportConfig,
    filename: 'error-%DATE%.log',
    level: 'warn'
  }),

  new winston.transports.DailyRotateFile({
    ...dailyTransportConfig,
    filename: 'http-%DATE%.log',
    level: 'http',
    format: winston.format.combine(
			httpFilter()
		)
  }),
  
  new winston.transports.DailyRotateFile({
    ...dailyTransportConfig,
    filename: 'all-%DATE%.log'
  })
];

const exceptionHandlers = [
  new winston.transports.DailyRotateFile({
    ...dailyTransportConfig,
    filename: 'exceptions-%DATE%.log'
  })
];

const Logger = winston.createLogger({
  levels,
  format,
  transports,
  exceptionHandlers,
  exitOnError: false
});

export default Logger;