/* global registerHelper */
import Ember from 'ember';
import {expenseCategoryName, NO_NAME} from 'js--ember-expense-tracker/helpers/expense-category-name';
import {moduleForComponent, test} from 'ember-qunit';

const {
  Helper,
  HTMLBars
} = Ember;

moduleForComponent('Unit | Helper | expense category name', 'helper:expense-category-name', {
  integration: true,
  beforeEach() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Helper) {
      registerHelper('expense-category-name', expenseCategoryName);
    }
  }
});

// Replace this with your real tests.
test('it display category name', function(assert) {
  let categoryName = 'Cat 1';
  this.set('category', { title: categoryName });
  this.render(HTMLBars.compile(`{{expense-category-name category}}`));
  assert.ok(this.$().text(), categoryName, 'should display name if exists');
});

test('it display `Uncategorised` if empty category', function(assert) {
  this.set('category', null);
  this.render(HTMLBars.compile(`{{expense-category-name category}}`));
  assert.ok(this.$().text(), NO_NAME, 'should display name if exists');
});

test('it works in inline form', function(assert) {
  let template = HTMLBars.compile(`{{if category (expense-category-name category) 'Untitled'}}`);
  let categoryName = 'Cat 1';

  this.set('category', null);
  this.render(template);
  assert.ok(this.$().text(), 'Untitled', 'should display work in inline form');
  this.set('category', { title: categoryName });
  this.render(template);
  assert.ok(this.$().text(), categoryName, 'should display work in inline form');
});

test('it all define name for untitled category', function(assert) {
  this.set('category', null);
  this.render(HTMLBars.compile(`{{expense-category-name category 'Untitled Category'}}`));
  assert.ok(this.$().text(), 'Untitled Category', 'should display default name if no title exists');
});
