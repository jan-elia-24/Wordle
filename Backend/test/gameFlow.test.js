import request from 'supertest';
import { app } from '../server.js';

describe('Integration: Wordle game flow', () => {
  it('returns the same mocked word every time', async () => {
    const res = await request(app).get('/api/random-word?wordLength=5&allowRepeats=true');
    expect(res.statusCode).toBe(200);
    expect(res.body.word).toBe('apple');
  });
});