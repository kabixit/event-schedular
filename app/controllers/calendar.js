import Controller from '@ember/controller';

export default Controller.extend({
  currentView: 'week', // 'week', 'day', or 'month'
  newEventTitle: '',
  newEventDescription: '',
  newEventDate: '',
  editingEventId: null,

  init() {
    this._super(...arguments);
    this.set('currentMonth', moment().startOf('month').format('YYYY-MM-DD'));
  },

  actions: {
    setView(view) {
      this.set('currentView', view);
      if (view === 'month') {
        this.set('currentMonth', moment().startOf('month').format('YYYY-MM-DD'));
      }
    },

    nextMonth() {
      let next = moment(this.get('currentMonth')).add(1, 'month').format('YYYY-MM-DD');
      this.set('currentMonth', next);
    },

    prevMonth() {
      let prev = moment(this.get('currentMonth')).subtract(1, 'month').format('YYYY-MM-DD');
      this.set('currentMonth', prev);
    },

    openAddEventModal(date, hour) {
      let datetime = `${date}T${hour.toString().padStart(2, '0')}:00`;
      this.setProperties({
        newEventTitle: '',
        newEventDescription: '',
        newEventDate: datetime,
        editingEventId: null
      });
      new bootstrap.Modal(document.getElementById('addEventModal')).show();
    },

    openEditEventModal(event) {
      this.setProperties({
        newEventTitle: event.title,
        newEventDescription: event.description,
        newEventDate: event.date,
        editingEventId: event.id
      });
      new bootstrap.Modal(document.getElementById('addEventModal')).show();
    },

    saveNewEvent() {
      let title = this.get('newEventTitle').trim();
      if (!title) {
        alert('Title cannot be empty.');
        return;
      }

      let stored = localStorage.getItem('events');
      let events = stored ? JSON.parse(stored) : [];

      if (this.get('editingEventId')) {
        events = events.map(e => {
          if (e.id === this.get('editingEventId')) {
            return {
              id: e.id,
              title,
              description: this.get('newEventDescription'),
              date: this.get('newEventDate')
            };
          }
          return e;
        });
      } else {
        events.push({
          id: Date.now(),
          title,
          description: this.get('newEventDescription'),
          date: this.get('newEventDate')
        });
      }

      localStorage.setItem('events', JSON.stringify(events));
      this.set('model.events', events);
      bootstrap.Modal.getInstance(document.getElementById('addEventModal')).hide();
    },

    deleteEvent(eventId) {
      let stored = localStorage.getItem('events');
      let events = stored ? JSON.parse(stored) : [];
      let updatedEvents = events.filter(e => e.id !== eventId);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      this.set('model.events', updatedEvents);
    },

    handleDragStart(eventObj, evt) {
      evt.dataTransfer.setData('text/plain', JSON.stringify(eventObj));
    },

    allowDrop(evt) {
      evt.preventDefault();
    },

    handleDrop(date, hour, evt) {
      evt.preventDefault();
      let eventData = JSON.parse(evt.dataTransfer.getData('text/plain'));
      let stored = localStorage.getItem('events');
      let events = stored ? JSON.parse(stored) : [];

      events = events.map(e => {
        if (e.id === eventData.id) {
          return {
            id: e.id,
            title: e.title,
            description: e.description,
            date: `${date}T${hour.toString().padStart(2, '0')}:00`
          };
        }
        return e;
      });

      localStorage.setItem('events', JSON.stringify(events));
      this.set('model.events', events);
    },

    stopPropagation(evt) {
      evt.stopPropagation();
    }
  }
});
