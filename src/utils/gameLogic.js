export function isCorrectGuess(guess, correctWord) {
    return guess === correctWord;
  }
export function letterFeedback(guess, correctWord) {
    const result = Array(guess.length).fill('absent');
    const used = Array(correctWord.length).fill(false);
  
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === correctWord[i]) {
        result[i] = 'correct';
        used[i] = true;
      }
    }
  
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === 'correct') continue;
      for (let j = 0; j < correctWord.length; j++) {
        if (!used[j] && guess[i] === correctWord[j]) {
          result[i] = 'present';
          used[j] = true;
          break;
        }
      }
    }
  
    return result;
  }
  