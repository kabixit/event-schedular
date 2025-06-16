import Ember from 'ember';

export default Ember.Controller.extend({
  eventStore: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.applyStoredTheme();
  },

  actions: {
    toggleTheme() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('dark-mode') ? 'dark' : 'light'
      );
    }
  },

  applyStoredTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
});