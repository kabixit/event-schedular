import Ember from 'ember';
import EventManager from '../mixins/event-manager';

export default Ember.Controller.extend(EventManager, {
  currentView: 'week',
  currentMonth: null,
  newEventTitle: '',
  newEventDescription: '',
  newEventDate: '',
  editingEventId: null,

  init() {
    this._super(...arguments);
    this.set('currentMonth', window.moment().startOf('month').format('YYYY-MM-DD'));
  },

  showAlert(message) {
    const $modal = Ember.$('#alertModal');
    Ember.$('#alertModalBody').text(message);
    $modal.modal('show');
  },

  actions: {
    setView(view) {
      this.set('currentView', view);
      if (view === 'month') {
        this.set('currentMonth', window.moment().startOf('month').format('YYYY-MM-DD'));
      }
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
      const success = this.get('editingEventId') 
        ? this.updateEvent(
            this.get('editingEventId'),
            this.get('newEventTitle'),
            this.get('newEventDate'),
            this.get('newEventDescription')
          )
        : this.addEvent(
            this.get('newEventTitle'),
            this.get('newEventDate'),
            this.get('newEventDescription')
          );

      if (success) {
        bootstrap.Modal.getInstance(document.getElementById('addEventModal')).hide();
        this.notifyPropertyChange('events'); 
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

        this.setProperties({
          newEventTitle: eventData.title,
          newEventDescription: eventData.description,
          newEventDate: newDate,
          editingEventId: eventData.id
        });

        new bootstrap.Modal(document.getElementById('addEventModal')).show();

      } catch (error) {
        this.showAlert('Failed to move event');
      }
    },


    deleteEvent(eventOrId) {
      this.deleteEvent(eventOrId);
      this.notifyPropertyChange('events'); 
    },

    stopPropagation(evt) {
      evt.stopPropagation();
    }
  }
});
