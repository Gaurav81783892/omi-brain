const FREE_LIMIT = 3;

export function canUseProFeature() {
  const usage = JSON.parse(localStorage.getItem("omi_usage")) || 0;
  return usage < FREE_LIMIT;
}

export function incrementUsage() {
  let usage = JSON.parse(localStorage.getItem("omi_usage")) || 0;
  usage++;
  localStorage.setItem("omi_usage", usage);
}

export function isProUser() {
  return localStorage.getItem("omi_pro") === "true";
}

export function unlockPro() {
  localStorage.setItem("omi_pro", "true");
}
