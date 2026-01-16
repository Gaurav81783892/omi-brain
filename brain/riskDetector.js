export function detectRisk(symptoms) {
  const highRisk = ["chest","breathing","shortness","unconscious"];
  const moderateRisk = ["fever","vomiting","dizziness"];

  if (symptoms.some(s => highRisk.includes(s))) {
    return "HIGH";
  }

  if (symptoms.some(s => moderateRisk.includes(s))) {
    return "MODERATE";
  }

  return "LOW";
}

