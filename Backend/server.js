import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { getAllHighscores, saveHighscore, Highscore } from './highscoreService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5080;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/wordgame')
  .then(() => {
    console.log('✅ MongoDB connected');
  }).catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Load words
const words = fs.readFileSync(path.join(__dirname, 'data', 'words.txt'), 'utf-8')
  .split('\n')
  .map(w => w.trim().toLowerCase())
  .filter(w => w.length > 0);

// Serve static frontend build from root/dist
app.use(express.static(path.resolve(__dirname, '../dist')));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API: get random word
app.get('/api/random-word', (req, res) => {
  const wordLength = parseInt(req.query.wordLength);
  const allowRepeats = req.query.allowRepeats === 'true';

  let candidates = words.filter(word => word.length === wordLength);
  if (!allowRepeats) {
    candidates = candidates.filter(word => new Set(word).size === word.length);
  }

  if (candidates.length === 0) {
    return res.status(404).json({ error: 'No matching words found' });
  }

  const randomWord = candidates[Math.floor(Math.random() * candidates.length)];
  res.json({ word: randomWord });
});

// API: get highscores
app.get('/api/highscores', async (req, res) => {
  try {
    const scores = await getAllHighscores();
    res.json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch highscores' });
  }
});

// API: save highscore
app.post('/api/highscores', async (req, res) => {
  const { name, attempts, time, wordLength, allowRepeats } = req.body;

  try {
    const newScore = new Highscore({ name, attempts, time, wordLength, allowRepeats });
    await newScore.save();
    res.status(201).json({ message: 'Highscore saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save highscore' });
  }
});

// SSR: highscore EJS route
app.get('/highscores', async (req, res) => {
  try {
    const highscores = await getAllHighscores();
    res.render('highscores', { highscores });
  } catch (err) {
    res.status(500).send('Failed to render highscore page');
  }
});

// Fallback to frontend SPA (from root /dist)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export { app };
