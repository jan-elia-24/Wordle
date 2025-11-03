const API_BASE = window.location.origin;

export async function getRandomWord(gameOptions) {
  const response = await fetch(
    `${API_BASE}/api/random-word?wordLength=${gameOptions.wordLength}&allowRepeats=${gameOptions.allowRepeats}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch word');
  }
  const data = await response.json();
  return data.word;
}