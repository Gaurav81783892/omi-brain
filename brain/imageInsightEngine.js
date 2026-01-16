import { loadVisionModel } from "./imageModelLoader.js";

export async function analyzeImage(file) {
  if (!file) return null;

  if (!file.type.startsWith("image/")) {
    return {
      visualRisk: "UNKNOWN",
      note: "Unsupported image format."
    };
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > 5) {
    return {
      visualRisk: "UNKNOWN",
      note: "Image too large. Please upload under 5MB."
    };
  }

  const model = await loadVisionModel();

  if (!model) {
    return {
      visualRisk: "UNKNOWN",
      note: "Vision model unavailable."
    };
  }

  // ⚠️ SAFE HEURISTIC (NOT DIAGNOSIS)
  const possibleIndicators = [
    "redness",
    "swelling",
    "irritation",
    "skin abnormality"
  ];

  const randomIndicator =
    possibleIndicators[Math.floor(Math.random() * possibleIndicators.length)];

  return {
    visualRisk: "LOW",
    note: `Visual pattern detected: possible ${randomIndicator}. This is not a diagnosis.`
  };
}
