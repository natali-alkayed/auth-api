'use strict';

const request = require('supertest');
const { server } = require('../../server');
const { db, users } = require('../models/index');

describe('capabilities virtual field', () => {
    it ('GET /api/v2/:model with a bearer token that has read permissions', () => {
      const instance = users.build({ role: 'user' });
      expect(instance.capabilities).toEqual(['read']);
    });
  
    it('POST /api/v2/:model with a bearer token that has create permissions', () => {
      const instance = users.build({ role: 'writer' });
      expect(instance.capabilities).toEqual(['read', 'create']);
    });
  
    it('PUT /api/v2/:model/ID with a bearer token that has update permissions', () => {
      const instance = users.build({ role: 'editor' });
      expect(instance.capabilities).toEqual(['read', 'create', 'update']);
    });
  
    it('DELETE /api/v2/:model/ID with a bearer token that has delete permissions', () => {
      const instance = users.build({ role: 'admin' });
      expect(instance.capabilities).toEqual(['read', 'create', 'update', 'delete']);
    });
  });
  