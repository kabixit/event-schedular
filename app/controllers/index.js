import Ember from 'ember';
import EventManager from '../mixins/event-manager';

export default Ember.Controller.extend(EventManager, {
  newEventTitle: '',
  newEventDate: '',
  newEventDescription: '',
  editingEventId: null,
  editedEventTitle: '',
  editedEventDate: '',
  editedEventDescription: '',

  showAlert(message) {
    const $modal = Ember.$('#alertModal');
    Ember.$('#alertModalBody').text(message);
    $modal.modal('show');
  },

  actions: {
    addEvent() {
      const title = this.get('newEventTitle');
      const date = this.get('newEventDate');
      const description = this.get('newEventDescription');

      if (this.addEvent(title, date, description)) {
        this.setProperties({
          newEventTitle: '',
          newEventDate: '',
          newEventDescription: ''
        });
      }
    },

    startEdit(event) {
      this.setProperties({
        editingEventId: event.id,
        editedEventTitle: event.title,
        editedEventDate: event.date,
        editedEventDescription: event.description
      });
    },

    cancelEdit() {
      this.set('editingEventId', null);
    },

    saveEdit() {
      const event = this.findEventById(this.get('editingEventId'));
      if (event) {
        this.updateEvent(
          event.id,
          this.get('editedEventTitle'),
          this.get('editedEventDate'),
          this.get('editedEventDescription')
        );
        this.set('editingEventId', null);
      }
    },

     deleteEvent(event) {
      this.deleteEvent(event);
      return false; 
    }
  }
});