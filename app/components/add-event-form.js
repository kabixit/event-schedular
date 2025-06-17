import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['card', 'mb-5', 'premium-card', 'border-0', 'shadow-lg', 'rounded-4', 'position-relative', 'overflow-hidden'],

  // Data bindings from parent
  newEventTitle: '',
  newEventDate: '',
  newEventDescription: '',

  showForm: true,


  init() {
    this._super(...arguments);
    console.log('AddEventForm component initialized');
  },

  didInsertElement() {
    console.log('AddEventForm component DOM inserted');
  },

  willDestroyElement() {
    console.log('Cleaning up AddEventForm component');
  },

});
