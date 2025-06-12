import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({
  events: null,
  newEventTitle: '',
  newEventDate: '',
  newEventDescription: '',
  editingEventId: null,
  editedEventTitle: '',
  editedEventDate: '',
  editedEventDescription: '',

  init() {
    this._super(...arguments);
    this.loadEvents();
  },

  actions: {
    addEvent() {
      let title = this.get('newEventTitle').trim();
      let date = this.get('newEventDate').trim();
      let description = this.get('newEventDescription').trim();

      if (!title || !date) {
        alert('Please enter both Event Title and Date.');
        return;
      }

      let newEvent = {
        id: Date.now(),
        title: title,
        date: date,
        description: description
      };

      this.get('events').pushObject(newEvent); // ✅ Ember’s observable array → triggers UI update!

      this.setProperties({
        newEventTitle: '',
        newEventDate: '',
        newEventDescription: ''
      });

      this.saveEvents();
    },

    deleteEvent(event) {
      this.get('events').removeObject(event);
      this.saveEvents();
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

    saveEdit(event) {
      let title = this.get('editedEventTitle').trim();
      let date = this.get('editedEventDate').trim();
      let description = this.get('editedEventDescription').trim();

      if (!title || !date) {
        alert('Please provide both Title and Date.');
        return;
      }

      let foundEvent = this.get('events').findBy('id', event.id);
      if (foundEvent) {
        Ember.set(foundEvent, 'title', title);
        Ember.set(foundEvent, 'date', date);
        Ember.set(foundEvent, 'description', description);
        this.saveEvents();
        this.set('editingEventId', null);
      }
    }
  },

  loadEvents() {
    let stored = localStorage.getItem('events');
    let events = stored ? JSON.parse(stored) : [];
    this.set('events', Ember.A(events)); // ✅ Wrap with Ember.A → works in Ember 2.18
  },

  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.get('events')));
  }
});
