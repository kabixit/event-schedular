import Ember from 'ember';

export default Ember.Controller.extend({
  eventStore: Ember.inject.service(),
  
  newEventTitle: '',
  newEventDate: '',
  newEventDescription: '',

  editingEventId: null,
  editedEventTitle: '',
  editedEventDate: '',
  editedEventDescription: '',

  events: Ember.computed.readOnly('eventStore.events'),

  actions: {
    addEvent() {
      const { newEventTitle, newEventDate, newEventDescription } = this.getProperties(
        'newEventTitle', 'newEventDate', 'newEventDescription'
      );
      
      if (this.get('eventStore').addEvent(newEventTitle, newEventDate, newEventDescription)) {
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
        editedEventDescription: event.description || ''
      });
    },

    cancelEdit() {
      this.set('editingEventId', null);
    },

    saveEdit() {
      this.get('eventStore').updateEvent(
        this.get('editingEventId'),
        this.get('editedEventTitle'),
        this.get('editedEventDate'),
        this.get('editedEventDescription')
      );
      this.set('editingEventId', null);
    },

    deleteEvent(event) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.get('eventStore').deleteEvent(event.id);
      }
    }
  }
});