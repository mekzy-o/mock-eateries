/* eslint-disable no-plusplus */
import { config } from 'dotenv';
import session from 'express-session';
import moment from 'moment';
import uuid from 'uuid/v4';
import redis from 'redis';
import connectRedis from 'connect-redis';
import ServerResponse from './responseHandler';

config();

const { errorResponse } = ServerResponse;
const redisCache = connectRedis(session);
const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client has connected successfully');
});

client.on('error', (error) => {
  console.log(`Something went wrong ${error}, please try again later`);
});

export const rateLimiter = async (req, res, next) => {
  if (req.session.user) {
    const currentTime = moment().unix();
    const difference = (currentTime - req.session.user.startTime) / 60;
    if (difference >= 1) {
      const data = {
        count: 1,
        startTime: moment().unix(),
      };

      req.session.user = { ...data };
      next();
    }

    if (difference < 1) {
      if (req.session.user.count > 3) {
        return errorResponse(res, 429, {
          message: 'Request limit exceeded. Please wait a moment and try again',
        });
      }
      req.session.user.count++;
      next();
    }
  } else {
    const data = {
      count: 1,
      startTime: moment().unix(),
    };
    req.session.user = { ...data };
    next();
  }
};

export default () => session({
  genid: (req) => uuid(),
  // eslint-disable-next-line new-cap
  store: new redisCache({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    client,
  }),
  name: 'mock-eatery',
  secret: process.env.REDIS_SECRET,
  resave: false,
  cookie: { secure: false, maxAge: 86400000 },
  saveUninitialized: true,
});
