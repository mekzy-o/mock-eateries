/* eslint-disable max-len */
import request from 'supertest';
import app from '../app';
import {
  signUpUser, invalidLogin, loginUser, undefinedEmail, undefinedName, undefinedPassword, invalidPassword,
} from './mockData/mockUsers';

const baseUrl = '/api/v1';

describe('TEST SUITE FOR AUTH ROUTES', () => {
  it('should successfully sign up a user', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(signUpUser);
    expect(response.statusCode).toEqual(201);
    expect(response.body.user.message).toEqual(
      'Account has been created successfully!',
    );
  });
  it('should successfully sign in a user', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send(loginUser);
    expect(response.statusCode).toEqual(200);
    expect(response.body.user.message).toEqual(
      'You have successfully logged in',
    );
  });
  it('should throw error if name is missing during signup', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(undefinedName);
    expect(response.statusCode).toEqual(400);
    expect(response.body.errors.name).toEqual(
      'name is required',
    );
  });
  it('should throw error if email is missing during signup', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(undefinedEmail);
    expect(response.statusCode).toEqual(400);
    expect(response.body.errors.email).toEqual(
      'Email is required',
    );
  });
  it('should throw error if password is missing during signup', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(undefinedPassword);
    expect(response.statusCode).toEqual(400);
    expect(response.body.errors.password).toEqual(
      'Password is required',
    );
  });
  it('should throw error if password is missing during signin', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send(invalidLogin);
    expect(response.statusCode).toEqual(400);
    expect(response.body.errors.password).toEqual(
      'Password is required',
    );
  });
  it('should throw error if password is incomplete during signin', async () => {
    const response = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send(invalidPassword);
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors.message).toEqual(
      'You Entered an incorrect Email or Password',
    );
  });
});

describe('TEST SUITE FOR SEARCH ROUTE', () => {
  it('should successfully retrieve data the user searches for', async () => {
    const response = await request(app)
      .get(`${baseUrl}/search?keyword=fish&filter=category`);
    expect(response.statusCode).toEqual(200);
  });
});
