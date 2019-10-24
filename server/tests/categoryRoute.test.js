import request from 'supertest';
import app from '../app';
import {
  adminAccount, categoryData,
} from './mockData/mockCategories';

let token;
const baseUrl = '/api/v1';

beforeEach(async () => {
  const response = await request(app)
    .post(`${baseUrl}/auth/signin`)
    .send(adminAccount);
  token = response.body.user.token;
});

describe('TEST SUITE FOR CATEGORY ROUTES', () => {
  it('should create a new category', async (done) => {
    const response = await request(app)
      .post(`${baseUrl}/category`)
      .set('Authorization', `Bearer ${token}`)
      .send(categoryData);
    expect(response.status).toEqual(201);

    done();
  }); 
  it('should not create a new category if admin token is not provided', async (done) => {
    const response = await request(app)
      .post(`${baseUrl}/category`)
      .send(categoryData);
    expect(response.status).toEqual(401);

    done();
  });   
});
