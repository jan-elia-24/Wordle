import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export function GameOptions({ onOptionsChange }) {
  const [wordLength, setWordLength] = useState(2);
  const [allowRepeats, setAllowRepeats] = useState(false);

  const handleConfirm = () => {
    onOptionsChange?.({ wordLength, allowRepeats });
  };

  return (
    <div className="container pt-4">
      <div className="mb-3">
        <label className="form-label">How many letters in the word?</label>
        <select
          className="form-select"
          value={wordLength}
          onChange={(e) => setWordLength(parseInt(e.target.value))}
        >
          {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Allow repeated letters?</label>
        <select
          className="form-select"
          value={allowRepeats}
          onChange={(e) => setAllowRepeats(e.target.value === 'true')}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <div className="text-end">
        <button className="btn btn-success" onClick={handleConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}
