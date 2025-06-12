import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let stored = localStorage.getItem('events');
    let events = stored ? JSON.parse(stored) : [];

    let startOfWeek = window.moment().startOf('isoWeek');

    let days = [];
    for (let i = 0; i < 7; i++) {
      let date = startOfWeek.clone().add(i, 'days');
      days.push({
        date: date.format('YYYY-MM-DD'),
        label: date.format('ddd, MMM D')
      });
    }

    let hours = [];
    for (let h = 0; h < 24; h++) {
      hours.push(h);
    }

    return {
      events,
      days,
      hours
    };
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('model', null);
    }
  }
});
