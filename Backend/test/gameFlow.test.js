import { app } from '../server.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';

describe('Integration: Wordle game flow', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await mongoose.disconnect();
  });

  it('should complete a full game flow with mocked word', async () => {
    const res = await request(app).get('/api/random-word?wordLength=5&allowRepeats=true');
    expect(res.statusCode).toBe(200);
    expect(res.body.word).toBeDefined();
  });
});