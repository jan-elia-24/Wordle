import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

export function GuessedWord({ onGuess, wordLength, allowRepeats }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === wordLength) {
      if (!allowRepeats && hasRepeatedLetters(input)) {
        setError("Repeated letters are not allowed");
        return;
      }
      setError("");
      if (onGuess) onGuess(input);
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const lettersOnly = value.replace(/[^a-zA-ZåäöÅÄÖ]/g, '');
    setInput(lettersOnly.slice(0, wordLength).toLowerCase());
    setError("");
  };

  const hasRepeatedLetters = (word) => {
    return new Set(word.split('')).size !== word.length;
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <form onSubmit={handleSubmit} className="d-flex gap-2 w-100" style={{ maxWidth: '500px' }}>
        <input
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder={`Enter ${wordLength} letter word`}
          value={input}
          onChange={handleInputChange}
          pattern={`[a-zA-Z]{${wordLength}}`}
          title={`Please use only letters A–Z. No Swedish characters (Å, Ä, Ö) or symbols allowed.`}
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={input.length !== wordLength}
        >
          Guess
        </button>
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
      {!error && input.length !== wordLength && (
        <div className="text-muted mt-2">
          Word must be exactly {wordLength} letters long
        </div>
      )}
    </div>
  );
}