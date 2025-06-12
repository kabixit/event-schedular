import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.applyStoredTheme();
  },

  actions: {
    toggleTheme() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }
  },

  applyStoredTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
});
