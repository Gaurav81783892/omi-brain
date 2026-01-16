/* =========================
   OMI-BRAIN : FINAL app.js
   ========================= */

/* -------- IMPORTS -------- */
import { showDisclaimer } from "./ethics/disclaimer.js";

import { parseSymptoms } from "./brain/symptomParser.js";
import { scoreEvidence } from "./brain/evidenceScorer.js";
import { differentialAnalysis } from "./brain/differentialEngine.js";
import { detectRisk } from "./brain/riskDetector.js";
import { generateExplanation } from "./brain/explanationEngine.js";
import { analyzeImage } from "./brain/imageInsightEngine.js";
import { analyzeAyurveda } from "./brain/ayurvedaEngine.js";

/* -------- GLOBAL STATE -------- */
let currentLang = "en";
let translations = {};
let userHistory = JSON.parse(localStorage.getItem("omi_history")) || [];

/* -------- DOM -------- */
const analyzeBtn = document.getElementById("analyzeBtn");
const resultBox = document.getElementById("resultBox");
const languageSelector = document.getElementById("languageSelector");

/* -------- i18n ENGINE -------- */
async function loadLanguage(lang) {
  const res = await fetch(`./i18n/${lang}.json`);
  translations = await res.json();
  currentLang = lang;
  applyTranslations();
}

function applyTranslations() {
  document.querySelector("h1").innerText = translations.title;
  document.getElementById("symptomTitle").innerText = translations.symptomTitle;
  document.getElementById("symptomInput").placeholder = translations.placeholder;
  document.getElementById("analyzeBtn").innerText = translations.analyze;
  document.getElementById("resultTitle").innerText = translations.resultTitle;

  document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
}

languageSelector.addEventListener("change", (e) => {
  loadLanguage(e.target.value);
});

loadLanguage("en");

/* -------- USER MEMORY -------- */
function saveToHistory(symptoms, result) {
  userHistory.push({
    date: new Date().toISOString(),
    symptoms,
    result
  });
  localStorage.setItem("omi_history", JSON.stringify(userHistory));
}

/* -------- MAIN ANALYSIS -------- */
analyzeBtn.addEventListener("click", async () => {
  showDisclaimer();

  const symptomText = document.getElementById("symptomInput").value.trim();
  const imageFile = document.getElementById("imageInput").files[0];

  if (!symptomText && !imageFile) {
    alert("Please enter symptoms or upload an image.");
    return;
  }

  /* STEP 1: Parse symptoms */
  const parsedSymptoms = parseSymptoms(symptomText);

  /* STEP 2: Risk detection */
  const risk = detectRisk(parsedSymptoms);

  /* STEP 3: Modern medical DB */
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

  /* STEP 4: Evidence scoring */
  const evidenceScores = scoreEvidence(parsedSymptoms, medicalDB);

  /* STEP 5: Differential diagnosis */
  const conditions = differentialAnalysis(evidenceScores);

  /* STEP 6: Ayurveda reasoning */
  let ayurvedaInsight = null;
  try {
    const ayurvedaDB = await fetch("./data/ayurveda.json").then(r => r.json());
    ayurvedaInsight = analyzeAyurveda(parsedSymptoms, ayurvedaDB);
  } catch (e) {
    console.warn("Ayurveda DB not loaded");
  }

  /* STEP 7: Image insight */
  const imageInsight = await analyzeImage(imageFile);


  /* STEP 8: Explanation */
  const explanationText = generateExplanation(conditions, risk);

  /* -------- UI OUTPUT -------- */
  document.getElementById("riskLevel").innerHTML =
    `<strong>${translations.risk}:</strong> ${risk}`;

  document.getElementById("possibleConditions").innerHTML =
    `<strong>${translations.conditions}:</strong><ul>` +
    conditions.map(c =>
      `<li>${c.condition} (confidence: ${c.confidence})</li>`
    ).join("") +
    `</ul>`;

  let finalExplanation = explanationText;

  if (ayurvedaInsight) {
    finalExplanation +=
      `<br/><strong>Ayurveda Insight:</strong> ${ayurvedaInsight.dosha} — ${ayurvedaInsight.advice}`;
  }

  if (imageInsight) {
    finalExplanation += `<br/><em>${imageInsight.note}</em>`;
  }

  document.getElementById("explanation").innerHTML = finalExplanation;

  resultBox.classList.remove("hidden");

  /* STEP 9: Save memory */
  saveToHistory(parsedSymptoms, {
    risk,
    conditions
  });
});
