import { useState } from 'react'
import './App.css'
import { Header } from './components/header'
import { LetterBoard } from './components/letterBoard'

function App() {
  return (
    <>
      <Header />
      <LetterBoard />
    </>
  );
}

export default App;

