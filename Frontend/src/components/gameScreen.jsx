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
      alert('🎉 You guessed it right!');
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
        <p className="h5"><strong>Guess a word with {targetWord.length} letters</strong></p>
        <p><strong>Repeated letters: {gameOptions.allowRepeats ? '✔️ Allowed' : '❌ Not allowed'}</strong></p>
      </div>


      <GuessedWord
        onGuess={handleGuess}
        wordLength={gameOptions.wordLength}
        allowRepeats={gameOptions.allowRepeats}
      />

      <div className="mt-4">
        {guesses.map((guess, i) => (
          <div key={i} className="mb-3">
            <div className="d-flex align-items-center gap-1">
              <span className="me-2" style={{ fontSize: '1.2rem', minWidth: '50px' }}>
                #{i + 1}
              </span>
              <div className="d-flex gap-2">
                {feedback[i] && feedback[i].map((f, j) => (
                  <div
                    key={j}
                    className={`d-flex justify-content-center align-items-center 
                      ${f === 'correct' ? 'bg-success' :
                        f === 'present' ? 'bg-warning' : 'bg-secondary'}
                      text-white`}
                    style={{
                      width: '50px',
                      height: '50px',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {guess[j].toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}