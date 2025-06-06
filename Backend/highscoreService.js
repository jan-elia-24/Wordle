import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  name: String,
  attempts: Number,
  time: Number,
  wordLength: Number,        
  allowRepeats: Boolean,     
  date: {
    type: Date,
    default: Date.now
  }
});

const Highscore = mongoose.model('Highscore', highscoreSchema);

export async function saveHighscore(name, attempts, time, wordLength, allowRepeats) {
  const newScore = new Highscore({ name, attempts, time, wordLength, allowRepeats });
  return await newScore.save();
}

export async function getAllHighscores() {
  return await Highscore.find()
    .sort({ time: 1, attempts: 1 })
    .limit(10);
}

export { Highscore };
