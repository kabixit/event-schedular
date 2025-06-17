import Ember from 'ember';

export default Ember.Service.extend({
  isAuthenticated: false,
  currentUser: null,

  init() {
    this._super(...arguments);
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.setProperties({
        isAuthenticated: true,
        currentUser: storedUser
      });
    }
  },

  login(username, password) {
    if (username === 'admin' && password === 'password') {
      this.setProperties({
        isAuthenticated: true,
        currentUser: username
      });
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  },

  logout() {
    this.setProperties({
      isAuthenticated: false,
      currentUser: null
    });
    localStorage.removeItem('currentUser');
  }
});
