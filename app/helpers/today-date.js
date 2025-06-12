import Ember from 'ember';

export function todayDate() {
  return window.moment().format('YYYY-MM-DD');
}

export default Ember.Helper.helper(todayDate);
