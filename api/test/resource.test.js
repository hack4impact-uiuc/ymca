const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');

describe('GET / ', () => {
  test('API should return working message', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual('API working!');
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async done => {
  await mongoose.connection.close();
  done();
});
