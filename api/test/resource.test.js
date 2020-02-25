process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose')

describe('GET / ', () => {
  test('It should respond with an array of students', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual('API working!');
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async done => {
  // dbConnection.close();
  await mongoose.connection.close()
  done();
});
