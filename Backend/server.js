import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5080;

app.use(cors());
app.use(express.json());

const words = fs.readFileSync(path.join(__dirname, 'data', 'words.txt'), 'utf-8')
  .split('\n')
  .map(w => w.trim().toLowerCase())
  .filter(w => w.length > 0);

// API-endpoint
app.get('/api/random-word', (req, res) => {
  const wordLength = parseInt(req.query.wordLength);
  const allowRepeats = req.query.allowRepeats === 'true';

  let candidates = words.filter(word => word.length === wordLength);

  if (!allowRepeats) {
    candidates = candidates.filter(word => {
      const letters = new Set(word.split(''));
      return letters.size === word.length;
    });
  }

  if (candidates.length === 0) {
    return res.status(404).json({ error: 'No matching words found' });
  }

  const randomWord = candidates[Math.floor(Math.random() * candidates.length)];
  res.json({ word: randomWord });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
