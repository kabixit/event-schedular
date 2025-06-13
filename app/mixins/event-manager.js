import Ember from 'ember';

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    this.set('events', Ember.A([]));
    this.loadEvents();
  },

  loadEvents() {
    try {
      const stored = localStorage.getItem('events');
      const events = stored ? JSON.parse(stored) : [];
      this.set('events', Ember.A(events));
    } catch (error) {
      console.error('Failed to load events:', error);
      this.set('events', Ember.A([]));
    }
  },

  saveEvents() {
    try {
      localStorage.setItem('events', JSON.stringify(this.get('events')));
      this.notifyPropertyChange('events');
    } catch (error) {
      console.error('Failed to save events:', error);
      this.showAlert('Failed to save events. Try again.');
    }
  },

  findEventById(id) {
    return this.get('events').findBy('id', id);
  },

  hasConflict(date, excludeId = null) {
    return this.get('events').any(event => {
      return event.date === date && event.id !== excludeId;
    });
  },

  addEvent(title, date, description) {
    if (!title || !date) {
      this.showAlert('Title and date are required');
      return false;
    }

    if (this.hasConflict(date)) {
      this.showAlert('⚠️ Event conflict: another event is already scheduled at this time.');
      return false;
    }

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      date,
      description: description ? description.trim() : ''
    };

    this.get('events').pushObject(newEvent);
    this.saveEvents();
    return true;
  },

  updateEvent(id, title, date, description) {
    const event = this.findEventById(id);
    if (!event) {
      this.showAlert('Event not found');
      return false;
    }

    if (this.hasConflict(date, id)) {
      this.showAlert('⚠️ Event conflict: another event is already scheduled at this time.');
      return false;
    }

    Ember.set(event, 'title', title.trim());
    Ember.set(event, 'date', date);
    Ember.set(event, 'description', description ? description.trim() : '');

    this.saveEvents();
    return true;
  },

  deleteEvent(eventOrId) {
    const id = typeof eventOrId === 'object' ? eventOrId.id : eventOrId;
    if (!id) {
      console.error('No ID provided for deletion');
      return false;
    }

    const events = this.get('events').rejectBy('id', id);
    this.set('events', events);
    this.saveEvents();
    return false;
  },

  showAlert(message) {
    alert(message); // ← we can replace with custom toasts later if needed
  }
});
