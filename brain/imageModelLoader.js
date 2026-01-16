let model = null;

export async function loadVisionModel() {
  if (model) return model;

  try {
    // Placeholder – future TensorFlow.js model
    console.log("Loading vision model...");
    model = { loaded: true };
    return model;
  } catch (err) {
    console.error("Vision model load failed", err);
    return null;
  }
}
