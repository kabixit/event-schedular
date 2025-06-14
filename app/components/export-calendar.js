import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    exportToICS(events) {
      let icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//YourApp//EN
        CALSCALE:GREGORIAN
        `;

            events.forEach(event => {
                const localDateTime = this.formatToICSDateTimeLocal(new Date(event.date));

                icsContent += `
        BEGIN:VEVENT
        UID:${event.id}@yourapp
        DTSTAMP:${this.formatToICSDateTimeLocal(new Date())}
        DTSTART:${localDateTime}
        SUMMARY:${this.escapeText(event.title)}
        DESCRIPTION:${this.escapeText(event.description || '')}
        END:VEVENT
        `;
      });

      icsContent += `END:VCALENDAR`;

      const blob = new Blob([icsContent.trim()], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calendar.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  },

  formatToICSDateTimeLocal(date) {
    const pad = n => (n < 10 ? '0' + n : n);
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  },

  escapeText(text) {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }
});
