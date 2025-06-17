import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  username: '',
  password: '',
  errorMessage: '',

  actions: {
    login() {
      const { username, password } = this.getProperties('username', 'password');
      if (this.get('session').login(username, password)) {
        this.transitionToRoute('index');
        console.log('DEBUGGING')
      } else {
        this.set('errorMessage', 'Invalid username or password');
      }
    }
  }
});
