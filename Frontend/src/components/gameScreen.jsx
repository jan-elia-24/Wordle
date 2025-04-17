import { useEffect, useState } from 'react';
import { GuessedWord } from './guessedWord';
import { getRandomWord } from '../services/wordApi';
import { isCorrectGuess, letterFeedback } from '../utils/gameLogic';

export function GameScreen({ gameOptions }) {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWord() {
      setIsLoading(true);
      try {
        const word = await getRandomWord(gameOptions);
        setTargetWord(word.toLowerCase());
      } catch (error) {
        console.error("Error fetching word:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWord();
  }, [gameOptions]);

  const validateGuess = (guess) => {
    if (!gameOptions.allowRepeats) {
      const uniqueLetters = new Set(guess.split(''));
      return uniqueLetters.size === guess.length;
    }
    return true;
  };

  const handleGuess = (guess) => {
    const formattedGuess = guess.toLowerCase();

    if (!targetWord || formattedGuess.length !== gameOptions.wordLength) return;

    if (!validateGuess(formattedGuess)) {
      alert("Repeated letters are not allowed in this game mode!");
      return;
    }

    setGuesses((prev) => [...prev, formattedGuess]);

    if (isCorrectGuess(formattedGuess, targetWord)) {
      alert('🎉 Du gissade rätt!');
    } else {
      const fb = letterFeedback(formattedGuess, targetWord);
      setFeedback((prev) => [...prev, fb]);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-4 text-center">
        <p>Loading word...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <p className="h5"><strong>Gissa ett ord på {targetWord.length} bokstäver</strong></p>
        <p><strong>Upprepade bokstäver: {gameOptions.allowRepeats ? '✔️ Tillåtet' : '❌ Inte tillåtet'}</strong></p>
      </div>

      <GuessedWord 
        onGuess={handleGuess} 
        wordLength={gameOptions.wordLength}
        allowRepeats={gameOptions.allowRepeats}
      />

      <div className="mt-4">
        {guesses.map((guess, i) => (
          <div key={i} className="mb-2">
            <span>{guess} ➝ </span>
            {feedback[i] && feedback[i].map((f, j) => (
              <span 
                key={j} 
                className={`letter-feedback ${f}`}
                style={{ 
                  color: f === 'correct' ? 'green' : f === 'present' ? 'orange' : 'gray',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {guess[j]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}