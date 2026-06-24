const countryToLanguageMap = {
  CN: "zh-CN",
  TW: "zh-TW",
  HK: "zh-TW",
  MO: "zh-TW",
  JP: "ja",
  KR: "ko",
  ES: "es",
  MX: "es",
  FR: "fr",
  DE: "de",
  BR: "pt",
  PT: "pt",
  RU: "ru",
  SA: "ar",
  AE: "ar",
  IN: "hi"
};

function normalizeLocaleCode(languageCode) {
  if (!languageCode) return "";
  const normalized = languageCode.replace("_", "-");
  const lower = normalized.toLowerCase();
  if (lower === "zh-tw" || lower === "zh-hk" || lower === "zh-mo" || lower === "zh-hant") return "zh-TW";
  if (lower === "zh-cn" || lower === "zh-sg" || lower === "zh-hans" || lower === "zh") return "zh-CN";
  return lower.split("-")[0];
}

function matchSupportedLanguage(languageCode) {
  const normalized = normalizeLocaleCode(languageCode);
  if (!normalized) return "";
  if (supportedLanguages.some((language) => language.code === normalized)) return normalized;
  return supportedLanguages.find((language) => language.code.toLowerCase().startsWith(normalized))?.code || "";
}

function getBrowserLanguageCandidates() {
  const browserLanguages = Array.isArray(navigator.languages) ? navigator.languages : [];
  return [...browserLanguages, navigator.language].filter(Boolean);
}

function getCapacitorLanguageCandidate() {
  return "";
}

function detectPreferredLanguage(profile) {
  const manualLanguage = StorageAdapter.getManualLanguage();
  const savedManual = matchSupportedLanguage(manualLanguage);
  if (savedManual) return savedManual;

  const profileLanguage = matchSupportedLanguage(profile?.defaultLanguage);
  if (profileLanguage) return profileLanguage;

  const capacitorLanguage = matchSupportedLanguage(getCapacitorLanguageCandidate());
  if (capacitorLanguage) return capacitorLanguage;

  for (const candidate of getBrowserLanguageCandidates()) {
    const matched = matchSupportedLanguage(candidate);
    if (matched) return matched;
  }

  return "en";
}
