import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

export function GuessedWord({ onGuess }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.length > 0) {
            if (onGuess) onGuess(input);
            setInput("");
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <form onSubmit={handleSubmit} className="d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your guess"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Guess
                </button>
            </form>
        </div>
    );
}
