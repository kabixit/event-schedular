import Ember from 'ember';

export default Ember.Service.extend({
  events: Ember.A([]),

  init() {
    this._super(...arguments);
    this.loadEvents();
  },

  loadEvents() {
    try {
      const stored = localStorage.getItem('events');
      this.set('events', stored ? Ember.A(JSON.parse(stored)) : Ember.A([]));
    } catch (error) {
      console.error('Failed to load events:', error);
      this.set('events', Ember.A([]));
    }
  },

  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.get('events')));
    this.notifyPropertyChange('events');
  },

  addEvent(title, date, description) {
    if (!title || !date) return false;

    const newEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date,
      description: description ? description.trim() : ''
    };

    this.get('events').pushObject(newEvent);
    this.saveEvents();
    return true;
  },

  updateEvent(id, title, date, description) {
    const event = this.get('events').findBy('id', id);
    if (!event) return false;

    Ember.set(event, 'title', title.trim());
    Ember.set(event, 'date', date);
    Ember.set(event, 'description', description ? description.trim() : '');
    this.saveEvents();
    return true;
  },

  moveEvent(id, newDate) {
    const event = this.get('events').findBy('id', id);
    if (!event) return false;

    Ember.set(event, 'date', newDate);
    this.saveEvents();
    return true;
  },

  deleteEvent(id) {
    const events = this.get('events').rejectBy('id', id);
    this.set('events', events);
    this.saveEvents();
  }
});