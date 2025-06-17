import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['disabled'],

  disabled: Ember.computed.empty('filteredEvents'),

  click() {
    const events = this.get('filteredEvents');
    if (Ember.isEmpty(events)) return;
    this.exportToICS(events);
  },

  filteredEvents: Ember.computed('events.[]', 'currentView', 'currentMonth', function () {
    const events = this.get('events') || [];
    const view = this.get('currentView');
    const moment = window.moment;

    if (view === 'day') {
      const today = moment().format('YYYY-MM-DD');
      return events.filter(e => e.date.startsWith(today));
    }

    if (view === 'week') {
      const start = moment().startOf('isoWeek');
      const end = moment().endOf('isoWeek');
      return events.filter(e => moment(e.date).isBetween(start, end, null, '[]'));
    }

    if (view === 'month') {
      const start = moment(this.get('currentMonth')).startOf('month');
      const end = moment(this.get('currentMonth')).endOf('month');
      return events.filter(e => moment(e.date).isBetween(start, end, null, '[]'));
    }

    return events;
  }),

  exportToICS(events) {
    let ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//EN
CALSCALE:GREGORIAN
`.trim();

    events.forEach(e => {
      const date = this.formatToICSDateTimeLocal(new Date(e.date));
      ics += `
BEGIN:VEVENT
UID:${e.id}@yourapp
DTSTAMP:${this.formatToICSDateTimeLocal(new Date())}
DTSTART:${date}
SUMMARY:${this.escapeText(e.title)}
DESCRIPTION:${this.escapeText(e.description || '')}
END:VEVENT
`.trim();
    });

    ics += `
END:VCALENDAR
`.trim();

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  formatToICSDateTimeLocal(date) {
    return window.moment(date).format('YYYYMMDDTHHmmss');
  },

  escapeText(text) {
    return text.replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
  }
});
