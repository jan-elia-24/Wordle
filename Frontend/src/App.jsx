import { useState } from 'react'
import './App.css'
import { Header } from './components/header'

function App() {
  return (
    <>
      <Header />
      <div className="container mt-5 text-center">
        <h1 className="text-primary">🎉 Bootstrap is working!</h1>
        <p className="lead">
          Om du ser blå text och en snygg knapp här under – då funkar det!
        </p>
        <button className="btn btn-outline-success mt-3">Klicka mig</button>
      </div>
    </>
  );
}

export default App;

