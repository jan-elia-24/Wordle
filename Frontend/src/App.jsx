import { useState } from 'react';
import './App.css';
import { Header } from './components/header';
import { GameOptions } from './components/gameOptions';
import { GameScreen } from './components/gameScreen';

function App() {
  const [optionsConfirmed, setOptionsConfirmed] = useState(false);
  const [gameOptions, setGameOptions] = useState({ wordLength: 2, allowRepeats: false });

  const handleOptionsChange = (options) => {
    setGameOptions(options);
    setOptionsConfirmed(true);
  };

  return (
    <>
      <Header />
      {!optionsConfirmed && (
        <GameOptions onOptionsChange={handleOptionsChange} />
      )}
      {optionsConfirmed && (
        <GameScreen gameOptions={gameOptions} />
      )}
    </>
  );
}

export default App;
