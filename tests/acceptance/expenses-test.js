/* global visit, andThen, currentURL, findWithAssert */
import Ember from 'ember';
import {test} from 'qunit';
import moduleForAcceptance from 'js--ember-expense-tracker/tests/helpers/module-for-acceptance';

const {
  run
} = Ember;

const generateExpenseTitle = (i) => `Expense title #${i}`;

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

test('/expenses should display list of expenses', function(assert) {
  let objectsCount = 5;
  run(() => {
    for (let i = 0; i < objectsCount; i++) {
      store.createRecord('expense', {
        amount: i * 5,
        category: null,
        date: new Date(),
        description: `Expense description #${i}`,
        title: generateExpenseTitle(i)
      });
    }
  });

  visit('/expenses');

  andThen(function() {
    let el = findWithAssert('.qa--expense-item');
    assert.equal(el.length, objectsCount, `Should contains ${objectsCount} items`);
    for (let i = 0; i < objectsCount; i++) {
      assert.equal(el.get(i).textContent, generateExpenseTitle(i), `Should display title for expense ${i}`);
    }
  });
});
