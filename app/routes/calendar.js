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
    const startOfWeek = window.moment().startOf('isoWeek');

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');
      days.push({
        date: date.format('YYYY-MM-DD'),
        label: date.format('ddd, MMM D')
      });
    }

    return {
      days,
      hours: Array.from({ length: 24 }, (_, i) => i),
      events: this.get('eventStore.events')
    };
  },

  afterModel() {
    const events = this.get('eventStore.events');
    if (Ember.isEmpty(events)) {
      alert("You don't have any events yet! Start by adding your first one.");
    }
  }
});
