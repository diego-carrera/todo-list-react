/**
 * Auth class
 */
class Auth {

  /**
   * Clears all localstorage
   */
  static clearSession = () => {
    window.localStorage.clear();

  }

  /**
   * Sets the user status
   * @param {bool} status
   */
  static setAuthStatus = (status) => {
    window.localStorage.setItem('logged', status);
  };

  /**
   * Gets the auth status of the user
   * @returns {bool}
   */
  static getAuthStatus = () => {
    const status = window.localStorage.getItem('logged');
    if ( status ) {
      return true;
    }
    return false;
  };

  /**
   * Returns de user object
   * @returns {user}
   */
  static getUser = () => {
    const user = window.localStorage.getItem('user');
    if ( user ) {
      return JSON.parse(user);
    }
    return null;
  };

  /**
   * Sets the session user
   * @param {user} user
   */
  static setUser = (user) => {
    window.localStorage.setItem(
      'user',
      JSON.stringify(user)
    );
  };

  /**
   * Sets the auth token
   * @param {string} token
   */
  static setToken(token) {
    window.localStorage.setItem('token', token);
  }

  /**
   * gets the user token
   * @returns {string}
   */
  static getToken() {
    window.localStorage.getItem('token');
  }

}
export default Auth;
