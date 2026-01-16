export function scoreEvidence(symptoms, medicalDB) {
  const scores = {};

  symptoms.forEach(symptom => {
    medicalDB.forEach(disease => {
      if (disease.symptoms.includes(symptom)) {
        if (!scores[disease.name]) {
          scores[disease.name] = 0;
        }
        scores[disease.name] += disease.weight || 1;
      }
    });
  });

  return scores;
}

