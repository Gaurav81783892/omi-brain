import { showDisclaimer } from "./ethics/disclaimer.js";

const analyzeBtn = document.getElementById("analyzeBtn");
const resultBox = document.getElementById("resultBox");

analyzeBtn.addEventListener("click", () => {
  showDisclaimer();

  const symptoms = document.getElementById("symptomInput").value;
  const image = document.getElementById("imageInput").files[0];

  if (!symptoms && !image) {
    alert("Please enter symptoms or upload an image.");
    return;
  }

  // TEMP MOCK (Real AI brain next phase)
  const risk = "MODERATE";
  const conditions = ["Viral Infection", "Migraine", "Dehydration"];

  document.getElementById("riskLevel").innerHTML =
    `<strong>Risk Level:</strong> ${risk}`;

  document.getElementById("possibleConditions").innerHTML =
    `<strong>Possible Conditions:</strong><ul>` +
    conditions.map(c => `<li>${c}</li>`).join("") +
    `</ul>`;

  document.getElementById("explanation").innerHTML =
    "Based on the provided information, OMI-Brain suggests further medical consultation.";

  resultBox.classList.remove("hidden");
});

