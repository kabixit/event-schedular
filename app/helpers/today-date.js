import Ember from 'ember';

export default Ember.Helper.helper(function() {
  return window.moment().format('YYYY-MM-DD');
});