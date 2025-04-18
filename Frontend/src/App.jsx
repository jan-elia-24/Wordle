import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { GameOptions } from './components/gameOptions';
import { GameScreen } from './components/gameScreen';
import { About } from './components/about';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [optionsConfirmed, setOptionsConfirmed] = useState(false);
  const [gameOptions, setGameOptions] = useState({ wordLength: 2, allowRepeats: false });

  const handleOptionsChange = (options) => {
    setGameOptions(options);
    setOptionsConfirmed(true);
  };

  const handleRestart = () => {
    setOptionsConfirmed(false); 
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            !optionsConfirmed
              ? <GameOptions onOptionsChange={handleOptionsChange} />
              : <GameScreen gameOptions={gameOptions} onRestart={handleRestart} />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
