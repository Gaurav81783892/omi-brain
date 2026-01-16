export function analyzeAyurveda(symptoms, ayurvedaDB) {
  for (let rule of ayurvedaDB) {
    if (rule.symptoms.some(s => symptoms.includes(s))) {
      return {
        dosha: rule.dosha,
        advice: rule.guidance
      };
    }
  }
  return null;
}
