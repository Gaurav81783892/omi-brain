export function parseSymptoms(rawText) {
  if (!rawText) return [];

  const normalized = rawText
    .toLowerCase()
    .replace(/[^a-z\s,]/g, "");

  const tokens = normalized.split(/,|\s+/);

  const knownSymptoms = [
    "fever","cough","headache","chest","pain","nausea",
    "vomiting","fatigue","dizziness","rash","breathing",
    "shortness","throat","cold","weakness"
  ];

  const detected = [];

  tokens.forEach(word => {
    if (knownSymptoms.includes(word) && !detected.includes(word)) {
      detected.push(word);
    }
  });

  return detected;
}

