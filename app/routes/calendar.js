import Ember from 'ember';

export default Ember.Route.extend({
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

    const hours = [];
    for (let h = 0; h < 24; h++) {
      hours.push(h);
    }

    // ✅ FIX: Load events from localStorage
    let events = [];
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      events = JSON.parse(storedEvents);
    }

    return { days, hours, events };
  }
});
