/**
 * @module app
 * @desc Manages the express configuration settings for the application.
 * @requires express
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(301).redirect('/api/v1'));

app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'Welcome to Quick-Credit version 1',
}),);

// Throw error when user enters wrong Endpoints
app.use((req, res) => res.status(404).send({
  error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
