import { useEffect, useState } from 'react';
import { GuessedWord } from './guessedWord';
import { GameStats } from './gameStats';
import { getRandomWord } from '../services/wordApi';
import { isCorrectGuess, letterFeedback } from '../utils/gameLogic';
import { saveHighscore } from '../services/highscoreClient';

export function GameScreen({ gameOptions, onRestart }) {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    async function fetchWord() {
      setIsLoading(true);
      try {
        const word = await getRandomWord(gameOptions);
        setTargetWord(word.toLowerCase());
        setStartTime(Date.now());
        setElapsedTime(0);
        setGuesses([]);
        setFeedback([]);
        setAttempts(0);
      } catch (error) {
        console.error("Error fetching word:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWord();
  }, [gameOptions]);

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

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
    setAttempts((prev) => prev + 1);

    if (isCorrectGuess(formattedGuess, targetWord)) {
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      const name = prompt("🎉 You guessed it right!\nEnter your name for the highscore:");

      if (name) {
        saveHighscore(name, attempts + 1, totalTime)
          .then(() => {
            alert(`🎉 Your score has been saved!\nAttempts: ${attempts + 1}\nTime: ${totalTime} seconds`);
          })
          .catch(() => {
            alert("Could not save your score. Please try again.");
          });
      }
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
    <>
      <GameStats attempts={attempts} elapsedTime={elapsedTime} />

      <div className="container mt-4">
        <div className="mb-4">
          <p className="h5"><strong>Guess a word with {targetWord.length} letters</strong></p>
          <p><strong>Repeated letters: {gameOptions.allowRepeats ? '✔️ Allowed' : '❌ Not allowed'}</strong></p>
        </div>

        <GuessedWord
          onGuess={handleGuess}
          wordLength={gameOptions.wordLength}
          allowRepeats={gameOptions.allowRepeats}
          onRestart={onRestart}
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
                          f === 'present' ? 'bg-warning' : 'bg-danger'}
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
    </>
  );
}
