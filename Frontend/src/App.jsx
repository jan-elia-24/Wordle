import './App.css'
import { Header } from './components/header'
import { GameOptions } from './components/gameOptions';
import { GuessedWord } from './components/guessedWord'

function App() {
  return (
    <>
      <Header />
      <GameOptions />
      <GuessedWord />
    </>
  );
}

export default App;

