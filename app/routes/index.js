import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    return { events };
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('events', model.events);
  }
});
