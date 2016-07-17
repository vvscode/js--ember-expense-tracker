import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Route.extend({
  model() {
    return get(this, 'store')
      .findAll('expense')
      .then((data) => data.toArray());
  }
});
