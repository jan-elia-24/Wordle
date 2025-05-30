export async function getRandomWord({ wordLength, allowRepeats }) {
  const res = await fetch(`/api/random-word?wordLength=${wordLength}&allowRepeats=${allowRepeats}`);

  if (!res.ok) {
    throw new Error("Failed to fetch word");
  }

  const data = await res.json();
  return data.word;
}
