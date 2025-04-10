import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export function GameOptions({ onOptionsChange }) {
  const [wordLength, setWordLength] = useState(2);
  const [allowRepeats, setAllowRepeats] = useState(false);

  const handleWordLengthChange = (e) => {
    const value = parseInt(e.target.value);
    setWordLength(value);
    onOptionsChange?.({ wordLength: value, allowRepeats });
  };

  const handleAllowRepeatsChange = (e) => {
    const value = e.target.value === 'true';
    setAllowRepeats(value);
    onOptionsChange?.({ wordLength, allowRepeats: value });
  };

  return (
    <div className="container pt-4">
      <div className="mb-3">
        <label className="form-label">How many letters in the word?</label>
        <select
          className="form-select"
          value={wordLength}
          onChange={handleWordLengthChange}
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Allow repeated letters?</label>
        <select
          className="form-select"
          value={allowRepeats}
          onChange={handleAllowRepeatsChange}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
    </div>
  );
}
