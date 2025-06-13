import Ember from 'ember';

export default Ember.Helper.helper(function([date, format]) {
  return window.moment(date).format(format || 'YYYY-MM-DD');
});