/**
 * @module app
 * @desc Manages the express configuration settings for the application.
 * @requires express
 * @requires bodyParser
 * @requires logger
 * @requires morgan
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import logger from './logger';
import routes from '../routes';
import session, { rateLimiter } from '../utils/rateLimiter';
import passportAuth from '../middlewares/passport';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session());
app.use(rateLimiter);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Mock Eatery',
}));
app.use('/api/v1', routes);
passportAuth(passport);

// Throw error when user enters wrong Endpoints
app.use((req, res) => res.status(404).send({
  error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `Server is live on PORT: ${port}`,
  });
});

export default app;
