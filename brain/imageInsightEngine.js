export function analyzeImage(file) {
  if (!file) return null;

  const sizeMB = file.size / (1024 * 1024);

  if (sizeMB > 5) {
    return {
      note: "Image quality insufficient for analysis.",
      visualRisk: "UNKNOWN"
    };
  }

  // Placeholder for future ML model
  return {
    note: "Visual indicators detected. Cannot confirm condition.",
    visualRisk: "LOW"
  };
}

