import axios from 'axios';

const baseUrl = 'http://todolist.local';
// const baseUrl = 'http://to_do.local';

class Api {


  /**
   * Sets the authorization header
   */
  static setAuthorization = () => {
    console.log('setToken');
    const token = window.localStorage.getItem('token');
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  };

  /**
   * Logs in a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  static login = (email, password) => {
    const response = axios.post(
      `${baseUrl}/api/users/login.json`,
      {email: email, password: password}
    );
    return response;
  };

  /**
   * Registers a new user to the site
   * @param {string} email
   * @param {string} nick
   * @param {string} password
   * @returns {Promise}
   */
  static register = (email, nick, password) => {
    const response = axios.post(
      `${baseUrl}/api/users/register.json`,
      {email: email, nickname: nick, password: password}
    );
    return response;
  };

  /**
   * Gets the users todos
   * @returns {Promise}
   */
  static getTodos = () => {
    const response = axios.get(
      `${baseUrl}/api/todos/list.json`
      // `${baseUrl}/api/things/list.json`
    );

    return response;
  };

  /**
   * Marks a todo as complete
   * @param {number} id
   * @returns {Promise}
   */
  static markComplete = (id) => {
    const response = axios.get(`${baseUrl}/api/todos/complete/${id}.json`);
    return response;
  };

  /**
   * Delets a todo
   * @param {number} id
   * @returns {Promise}
   */
  static deleteTodo = (id) => {
    const response = axios.delete(`${baseUrl}/api/todos/delete/${id}.json`);
    return response;
  };

  /**
   * Creates a new todo
   * @param {string} task
   * @returns {Promise}
   */
  static createTodo = (task) => {
    const response = axios.post(
      `${baseUrl}/api/todos/create.json`,
      {task: task}
    );

    return response;
  };

}

export default Api;
