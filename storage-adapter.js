const StorageAdapter = (() => {
  const keys = {
    profile: "tarotLocalUserProfile",
    manualLanguage: "tarotLanguage"
  };

  function readJson(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn(`Storage read failed for ${key}`, error);
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Storage write failed for ${key}`, error);
      return false;
    }
  }

  function readText(key, fallback = "") {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      console.warn(`Storage read failed for ${key}`, error);
      return fallback;
    }
  }

  function writeText(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Storage write failed for ${key}`, error);
      return false;
    }
  }

  return {
    getJson(key, fallback = null) {
      return readJson(key, fallback);
    },
    setJson(key, value) {
      return writeJson(key, value);
    },
    getProfile() {
      return readJson(keys.profile, null);
    },
    saveProfile(profile) {
      return writeJson(keys.profile, profile);
    },
    getManualLanguage() {
      return readText(keys.manualLanguage, "");
    },
    saveManualLanguage(language) {
      return writeText(keys.manualLanguage, language);
    },
    removeManualLanguage() {
      localStorage.removeItem(keys.manualLanguage);
    }
  };
})();
