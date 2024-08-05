const COOKIE_NAMES = {
  Auth: 'tradeTigerAuthToken',
  SelectedShip: 'tradeTigerShipId',
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

  // Persisting selected ship
  setSelectedShip(shipId: string) {
    return localStorage.setItem(COOKIE_NAMES.SelectedShip, shipId);
  },
  getSelectedShip() {
    return localStorage.getItem(COOKIE_NAMES.SelectedShip);
  },
  hasSelectedShip() {
    return !!this.getSelectedShip();
  },
  clearSelectedShip() {
    localStorage.removeItem(COOKIE_NAMES.SelectedShip);
  },
};
