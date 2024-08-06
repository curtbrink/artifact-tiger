const COOKIE_NAMES = {
  Auth: 'artifactTigerAuthToken',
  SelectedCharacter: 'artifactTigerSelectedCharacter',
};

export default {
  // Authentication
  setAuthToken(token: string) {
    return localStorage.setItem(COOKIE_NAMES.Auth, token);
  },
  getAuthToken() {
    return localStorage.getItem(COOKIE_NAMES.Auth);
  },
  hasAuthToken() {
    return !!this.getAuthToken();
  },
  clearAuthToken() {
    localStorage.removeItem(COOKIE_NAMES.Auth);
  },

  // Persisting selected character
  setSelectedCharacter(characterName: string) {
    return localStorage.setItem(COOKIE_NAMES.SelectedCharacter, characterName);
  },
  getSelectedCharacter() {
    return localStorage.getItem(COOKIE_NAMES.SelectedCharacter);
  },
  hasSelectedCharacter() {
    return !!this.getSelectedCharacter();
  },
  clearSelectedShip() {
    localStorage.removeItem(COOKIE_NAMES.SelectedCharacter);
  },
};
