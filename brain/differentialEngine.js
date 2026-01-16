export function differentialAnalysis(scores) {
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);

  return sorted.slice(0, 3).map(item => ({
    condition: item[0],
    confidence: item[1]
  }));
}

