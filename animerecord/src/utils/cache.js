class LocalCache {
  setCache(key, value) {
    // obj => string
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    // string => obj
    const value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key) {
    window.sessionStorage.removeItem(key);
  }

  clearCache() {
    window.sessionStorage.clear();
  }
}

export default new LocalCache();
