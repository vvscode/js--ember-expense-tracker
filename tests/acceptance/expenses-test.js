/* global visit, andThen, currentURL */
import { test } from 'qunit';
import moduleForAcceptance from 'js--ember-expense-tracker/tests/helpers/module-for-acceptance';

let store;

moduleForAcceptance('Acceptance | expenses', {
  beforeEach() {
    store = this.application.__container__.lookup('service:store');
  },
  afterEach() {
    store = null;
  }
});

test('visiting /expenses', function(assert) {
  visit('/expenses');

  andThen(function() {
    assert.equal(currentURL(), '/expenses');
  });
});
