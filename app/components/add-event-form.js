import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['card', 'mb-5', 'premium-card', 'border-0', 'shadow-lg', 'rounded-4', 'position-relative', 'overflow-hidden'],

  newEventTitle: '',
  newEventDate: '',
  newEventDescription: '',

  showForm: true,


  init() {
    this._super(...arguments);
    if (!this.get('newEventDate')) {
      this.set('newEventDate', moment().format('YYYY-MM-DDTHH:mm')); 
    }
    console.log('AddEventForm component initialized');
  },

  didInsertElement() {
    this._super(...arguments);
    this.$('#eventTitle').focus();   
  },

  willDestroyElement() {
    console.log('Cleaning up AddEventForm component');
  },

});
