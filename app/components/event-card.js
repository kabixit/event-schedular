import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['card', 'premium-event-card', 'h-100', 'border-0', 'shadow-sm', 'rounded-4', 'p-4', 'position-relative'],

  init() {
    this._super(...arguments);
    console.log(`Component initialized for event: ${this.get('event.title')}`);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    console.log(`Attributes updated for event: ${this.get('event.title')}`);
  },

  didInsertElement() {
    console.log(`DOM inserted for event: ${this.get('event.title')}`);
  },

  didUpdate() {
    this._super(...arguments);
    console.log(`Component updated (re-rendered) for event: ${this.get('event.title')}`);
  },

  willDestroyElement() {
    console.log(`Cleaning up component for event: ${this.get('event.title')}`);
  },

  actions: {
    startEdit() {
      this.sendAction('startEdit', this.get('event'));
    },

    deleteEvent() {
      this.sendAction('deleteEvent', this.get('event'));
    },

    cancelEdit() {
      this.sendAction('cancelEdit');
    },

    saveEdit() {
      this.sendAction('saveEdit');
    }
  }
});
