/* global visit, andThen, currentURL */
import { test } from 'qunit';
import moduleForAcceptance from 'js--ember-expense-tracker/tests/helpers/module-for-acceptance';

let store;

moduleForAcceptance('Acceptance | expenses list', {
  beforeEach() {
    store = this.application.__container__.lookup('service:store');
  },
  afterEach() {
    store = null;
  }
});

test('visiting /expenses-list', function(assert) {
  visit('/expenses-list');

  andThen(function() {
    assert.equal(currentURL(), '/expenses-list');
  });
});
