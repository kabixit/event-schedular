import Ember from 'ember';

export default Ember.Helper.helper(function([date]) {
  return window.moment(date).format('HH:mm');
});