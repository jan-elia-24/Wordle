export async function getRandomWord({ wordLength, allowRepeats }) {
    const res = await fetch(`/api/random-word?wordLength=${wordLength}&allowRepeats=${allowRepeats}`);
    const data = await res.json();
    return data.word;
  }
  