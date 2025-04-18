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
    // 1: Get a random word from the API
    const wordRes = await request(app).get('/api/random-word?wordLength=5&allowRepeats=true');
    expect(wordRes.statusCode).toBe(200);
    const word = wordRes.body.word;
    expect(word).toBeDefined();

    // 2: Submit a highscore for the mocked word
    const highscorePayload = {
      name: 'IntegrationTestUser',
      attempts: 3,
      time: 12,
      wordLength: 5,
      allowRepeats: true
    };

    const postRes = await request(app).post('/api/highscores').send(highscorePayload);
    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.message).toBe('Highscore saved!');

    // 3: Fetch highscores and verify the entry exists
    const getRes = await request(app).get('/api/highscores');
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'IntegrationTestUser' })
      ])
    );
  });
});