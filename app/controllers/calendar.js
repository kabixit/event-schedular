import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default Controller.extend({
  eventStore: service(),
  modal: service(),
  
  currentView: 'week',
  currentMonth: null,
  
  newEventTitle: '',
  newEventDescription: '',
  newEventDate: '',
  editingEventId: null,

  events: computed.readOnly('eventStore.events'),

  init() {
    this._super(...arguments);
    this.set('currentMonth', window.moment().startOf('month').format('YYYY-MM-DD'));
  },


  showAlert(message) {
    const modal = new window.bootstrap.Modal(document.getElementById('alertModal'));
    document.getElementById('alertModalBody').textContent = message;
    modal.show();
  },

  actions: {
    setView(view) {
      this.set('currentView', view);
      if (view === 'month') {
        this.set('currentMonth', window.moment().startOf('month').format('YYYY-MM-DD'));
      }
    },
     viewDay(date) {
      this.set('currentView', 'day');
      this.set('currentDate', date); // You'll need to handle this in your day view
    },
  
    nextMonth() {
      const next = window.moment(this.get('currentMonth')).add(1, 'month').format('YYYY-MM-DD');
      this.set('currentMonth', next);
    },

    prevMonth() {
      const prev = window.moment(this.get('currentMonth')).subtract(1, 'month').format('YYYY-MM-DD');
      this.set('currentMonth', prev);
    },

    openAddEventModal(date, hour) {
      const datetime = `${date}T${hour.toString().padStart(2, '0')}:00`;
      this.setProperties({
        newEventTitle: '',
        newEventDescription: '',
        newEventDate: datetime,
        editingEventId: null
      });
      new window.bootstrap.Modal(document.getElementById('addEventModal')).show();
    },

    openEditEventModal(event) {
      this.setProperties({
        newEventTitle: event.title,
        newEventDescription: event.description,
        newEventDate: event.date,
        editingEventId: event.id
      });
      new window.bootstrap.Modal(document.getElementById('addEventModal')).show();
    },

    saveNewEvent() {
      const success = this.get('editingEventId') 
        ? this.get('eventStore').updateEvent(
            this.get('editingEventId'),
            this.get('newEventTitle'),
            this.get('newEventDate'),
            this.get('newEventDescription')
          )
        : this.get('eventStore').addEvent(
            this.get('newEventTitle'),
            this.get('newEventDate'),
            this.get('newEventDescription')
          );

      if (success) {
        window.bootstrap.Modal.getInstance(document.getElementById('addEventModal')).hide();
      }
    },

    handleDragStart(eventObj, evt) {
      evt.dataTransfer.setData('text/plain', JSON.stringify(eventObj));
    },

    allowDrop(evt) {
      evt.preventDefault();
    },

    handleDrop(date, hour, evt) {
      evt.preventDefault();
      try {
        const eventData = JSON.parse(evt.dataTransfer.getData('text/plain'));
        if (!eventData.id) throw new Error('Invalid event data');

        const newDate = `${date}T${hour.toString().padStart(2, '0')}:00`;
        this.get('eventStore').updateEvent(
          eventData.id,
          eventData.title,
          newDate,
          eventData.description
        );
      } catch (error) {
        this.showAlert('Failed to move event');
      }
    },

    deleteEvent(eventOrId) {
      const id = typeof eventOrId === 'object' ? eventOrId.id : eventOrId;
      if (confirm('Are you sure you want to delete this event?')) {
        this.get('eventStore').deleteEvent(id);
      }
    },

    stopPropagation(evt) {
      evt.stopPropagation();
    },

    showHourEvents(date, hour, event) {
      const events = this.filterByHour(this.get('events'), date, hour);
      this.get('modal').show('events-popover', {
        title: `Events at ${hour}:00`,
        events,
        target: event.target
      });
    },

    showDateEvents(date, event) {
      const events = this.filterByDate(this.get('events'), date);
      this.get('modal').show('events-popover', {
        title: window.moment(date).format('MMMM D'),
        events,
        target: event.target
      });
    }
  }
});