import Ember from 'ember';

export function now() {
  return new Date();
}

export default Ember.Helper.helper(now);
