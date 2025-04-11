import { useState } from 'react';
import './App.css';
import { Header } from './components/header';
import { GameOptions } from './components/gameOptions';
import { GuessedWord } from './components/guessedWord';

function App() {
  const [optionsConfirmed, setOptionsConfirmed] = useState(false);
  const [gameOptions, setGameOptions] = useState({ wordLength: 2, allowRepeats: false });

  const handleOptionsChange = (options) => {
    setGameOptions(options);
    setOptionsConfirmed(true);
  };

  const handleGuess = (guess) => {
    console.log("User guessed:", guess);
    // logik för att kontrollera orden
  };

  return (
    <>
      <Header />
      {!optionsConfirmed && (
        <GameOptions onOptionsChange={handleOptionsChange} />
      )}
      {optionsConfirmed && (
        <GuessedWord onGuess={handleGuess} />
      )}
    </>
  );
}

export default App;
