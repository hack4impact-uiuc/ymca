const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');

beforeEach(() => {
  // TODO: drop database
});

describe('GET / ', () => {
  test('API should return working message', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual('API working!');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/resources/ ', () => {
  test('API should return working message', async () => {
    const response = await request(app).get('/api/resources/');
    expect(response.body.message).toEqual('');
    expect(response.body.result).toEqual([]);
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async (done) => {
  // TODO: drop database
  await mongoose.connection.close();
  done();
});
