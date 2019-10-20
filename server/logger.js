/**
 * @fileOverview Contains the logger instance
 *
 * @author Emeka Ofe
 *
 * @requires NPM:winston
*/

import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: false }),
    winston.format.simple(),
  ),
  defaultMeta: { service: 'App Server' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
