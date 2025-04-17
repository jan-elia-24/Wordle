export async function saveHighscore(name, attempts, time) {
    const response = await fetch('http://localhost:5080/api/highscores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, attempts, time })
    });
  
    if (!response.ok) {
      throw new Error('Failed to save highscore');
    }
  
    return response.json();
  }
  