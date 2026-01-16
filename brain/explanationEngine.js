export function generateExplanation(result, risk) {
  let text = `Based on symptom correlation, the system analyzed multiple medical knowledge sources. `;

  text += `Risk level is assessed as ${risk}. `;

  if (risk === "HIGH") {
    text += "Immediate medical attention is strongly advised.";
  } else if (risk === "MODERATE") {
    text += "Medical consultation is recommended.";
  } else {
    text += "Condition appears manageable with basic care.";
  }

  text += " This analysis is informational, not diagnostic.";

  return text;
}

