import Ember from 'ember';

export default Ember.Route.extend({
  eventStore: Ember.inject.service(),
  session: Ember.inject.service(), 
  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model() {
    return this.get('eventStore').events;
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      newEventTitle: '',
      newEventDate: '',
      newEventDescription: '',
      editingEventId: null,
      editedEventTitle: '',
      editedEventDate: '',
      editedEventDescription: ''
    });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.setProperties({
        newEventTitle: '',
        newEventDate: '',
        newEventDescription: '',
        editingEventId: null,
        editedEventTitle: '',
        editedEventDate: '',
        editedEventDescription: ''
      });
    }
  }
});
