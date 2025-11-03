const API_BASE = window.location.origin;

export async function saveHighscore(name, attempts, time, wordLength, allowRepeats) {
  const response = await fetch(`${API_BASE}/api/highscores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, attempts, time, wordLength, allowRepeats })
  });

  if (!response.ok) {
    throw new Error('Failed to save highscore');
  }

  return response.json();
}

export async function getHighscores() {
  const response = await fetch(`${API_BASE}/api/highscores`);
  if (!response.ok) {
    throw new Error('Failed to fetch highscores');
  }
  return response.json();
}