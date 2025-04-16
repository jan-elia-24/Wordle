import { useEffect, useState } from 'react';
import { GuessedWord } from './guessedWord';
import { getRandomWord } from '../services/wordApi';
import { isCorrectGuess, letterFeedback } from '../utils/gameLogic';

export function GameScreen({ gameOptions }) {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    async function fetchWord() {
      const word = await getRandomWord(gameOptions);
      setTargetWord(word.toLowerCase()); 
    }
    fetchWord();
  }, [gameOptions]);

  const handleGuess = (guess) => {
    const formattedGuess = guess.toLowerCase();

    if (!targetWord) return;

    setGuesses((prev) => [...prev, formattedGuess]);

    if (isCorrectGuess(formattedGuess, targetWord)) {
      alert('🎉 Du gissade rätt!');
    } else {
      const fb = letterFeedback(formattedGuess, targetWord);
      setFeedback((prev) => [...prev, fb]);
    }
  };

  return (
    <div className="container mt-4">
      <p><strong>Gissa ett ord på {targetWord.length} bokstäver</strong></p>

      <GuessedWord onGuess={handleGuess} />

      {guesses.map((guess, i) => (
        <div key={i}>
          <span>{guess} ➝ </span>
          {feedback[i] && feedback[i].map((f, j) => (
            <span key={j} style={{ 
              color: f === 'correct' ? 'green' : f === 'present' ? 'orange' : 'gray' 
            }}>
              {guess[j]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
