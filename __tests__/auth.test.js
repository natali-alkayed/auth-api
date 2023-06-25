'use strict';

process.env.SECRET = "secretstring";

const { db } = require('../src/auth/models/users')
const supertest = require('supertest');
const server = require('../src/server');


const mockRequest = supertest(server);

let userData = {
  testUser: { username: 'user', password: 'password' },
};
let accessToken = null;

beforeAll(async () => {
  await db.sync();
});


describe('Auth Router', () => {

  it('POST /signup creates a new user and sends an object with the user and the token to the client.', async () => {

    const response = await mockRequest.post('/signup').send(userData.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userData.testUser.username);
  });

  it('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client.', async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post('/signin')
      .auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });});
////////////////////////////////////////////////////////////////////
  describe('V2 (Authenticated API) routes', () => {
    let bearerToken;
  beforeEach(() => {
    bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdGFsaSIsImlhdCI6MTY4NzY5NjUxMn0.uXaSV6cPsTdC29bP4svArl7s0nOhpok4ewpPZoGN6pk';
  });

  it('should add an item to the DB and return the added item', async () => {
    const response = await request(app)
      .post('/api/v2/food')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send({ /* Your request body */
      name: 'apple',
      calories: 1,
      type: 'fruit'});

    expect(response.status).toBe(200);
    // Additional assertions for the response object
  });

  // Test GET /api/v2/:model
  it('should return a list of :model items', async () => {
    const response = await request(app)
      .get('/api/v2/food')
      .set('Authorization', `Bearer ${bearerToken}`);

    expect(response.status).toBe(200);
    // Additional assertions for the response object
  });

  // Test GET /api/v2/:model/ID
  it('should return a single item by ID', async () => {
    const itemId = '1';
    const response = await request(app)
      .get(`/api/v2/food/${itemId}`)
      .set('Authorization', `Bearer ${bearerToken}`);

    expect(response.status).toBe(200);
    // Additional assertions for the response object
  });

  // Test PUT /api/v2/:model/ID
  it('should return a single, updated item by ID', async () => {
    const itemId = '1';
    const response = await request(app)
      .put(`/api/v2/food/${itemId}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send({ /* Your request body */
      name: 'tomito',
      calories: 1,
      type: 'fruit' });

    expect(response.status).toBe(200);
    // Additional assertions for the response object
  });

  // Test DELETE /api/v2/:model/ID
  it('should return an empty object and subsequent GET should not find the item', async () => {
    const itemId = '1';

    // Delete the item
    const deleteResponse = await request(app)
      .delete(`/api/v2/food/${itemId}`)
      .set('Authorization', `Bearer ${bearerToken}`);

    expect(deleteResponse.status).toBe(200);
    // Additional assertions for the deleteResponse object

    // Subsequent GET for the same ID
    const getResponse = await request(app)
      .get(`/api/v2/food/${itemId}`)
      .set('Authorization', `Bearer ${bearerToken}`);

    expect(getResponse.status).toBe(404);
    // Additional assertions for the getResponse object
  });



afterAll(async () => {
  await db.drop();
});});