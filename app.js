import { parseSymptoms } from "./brain/symptomParser.js";
import { scoreEvidence } from "./brain/evidenceScorer.js";
import { differentialAnalysis } from "./brain/differentialEngine.js";
import { detectRisk } from "./brain/riskDetector.js";
import { generateExplanation } from "./brain/explanationEngine.js";
import { analyzeImage } from "./brain/imageInsightEngine.js";
import { showDisclaimer } from "./ethics/disclaimer.js";

analyzeBtn.addEventListener("click", () => {
  showDisclaimer();

  const symptomText = document.getElementById("symptomInput").value;
  const imageFile = document.getElementById("imageInput").files[0];

  if (!symptomText && !imageFile) {
    alert("Please enter symptoms or upload an image.");
    return;
  }

  // 🧠 STEP 1: Parse symptoms
  const parsedSymptoms = parseSymptoms(symptomText);

  // 🧠 STEP 2: Detect risk
  const risk = detectRisk(parsedSymptoms);

  // 🧠 STEP 3: Medical knowledge base (expandable)
  const medicalDB = [
    {
      name: "Viral Infection",
      symptoms: ["fever", "cough", "fatigue"],
      weight: 2
    },
    {
      name: "Migraine",
      symptoms: ["headache", "nausea"],
      weight: 1
    },
    {
      name: "Dehydration",
      symptoms: ["dizziness", "weakness"],
      weight: 1
    }
  ];

  // 🧠 STEP 4: Evidence scoring
  const evidenceScores = scoreEvidence(parsedSymptoms, medicalDB);

  // 🧠 STEP 5: Differential analysis
  const conditions = differentialAnalysis(evidenceScores);

  // 🧠 STEP 6: Image insight (optional)
  const imageInsight = analyzeImage(imageFile);

  // 🧠 STEP 7: Explanation
  const explanationText = generateExplanation(conditions, risk);

  // 🧾 OUTPUT UI
  document.getElementById("riskLevel").innerHTML =
    `<strong>Risk Level:</strong> ${risk}`;

  document.getElementById("possibleConditions").innerHTML =
    `<strong>Possible Conditions:</strong><ul>` +
    conditions.map(c =>
      `<li>${c.condition} (confidence: ${c.confidence})</li>`
    ).join("") +
    `</ul>`;

  document.getElementById("explanation").innerHTML =
    explanationText +
    (imageInsight ? `<br/><em>${imageInsight.note}</em>` : "");

  resultBox.classList.remove("hidden");
});
