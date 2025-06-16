import Ember from 'ember';

export default Ember.Route.extend({
  eventStore: Ember.inject.service(),

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
  }
});