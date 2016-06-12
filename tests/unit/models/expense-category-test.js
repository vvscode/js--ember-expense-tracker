import Ember from 'ember';
import {moduleForModel, test} from 'ember-qunit';

const {
  get,
  run,
  set
} = Ember;

moduleForModel('expense-category', 'Unit | Model | expense category', {
  // Specify the other units that are required for this test.
  needs: ['model:expense']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it calculate amount', function(assert) {
  let store = this.store();
  let category;
  let subCategory1;
  let subCategory2;
  let subSubCategory11;
  let expense;

  run(()=> category = store.createRecord('expense-category', { title: 'Category for calculating amount' }));
  assert.equal(get(category, 'amount'), 0, 'Default amount is 0');

  run(()=> store.createRecord('expense', { amount: 1, category }));
  assert.equal(get(category, 'amount'), 1, 'It should include expenses amount ( single expense )');
  run(()=> store.createRecord('expense', { amount: 5, category }));
  assert.equal(get(category, 'amount'), 6, 'It should include expenses amount ( multiple expenses )');

  run(()=> subCategory1 = store.createRecord('expense-category', { title: 'Subcategory 1', parentCategory: category }));
  run(()=> store.createRecord('expense', { amount: 10, category: subCategory1 }));
  assert.equal(get(category, 'amount'), 16, 'It should include amount from subcategories');
  run(()=> subCategory2 = store.createRecord('expense-category', { title: 'Subcategory 2', parentCategory: category }));
  run(()=> store.createRecord('expense', { amount: 50, category: subCategory2 }));
  run(()=> store.createRecord('expense', { amount: 60, category: subCategory2 }));
  assert.equal(get(category, 'amount'), 126, 'It should include amount from subcategories');

  run(()=> subSubCategory11 = store.createRecord('expense-category', {
    title: 'Sub Subcategory 1',
    parentCategory: subCategory1
  }));
  run(()=> expense = store.createRecord('expense', { amount: 100, category: subSubCategory11 }));
  assert.equal(get(category, 'amount'), 226, 'It should include amount from sub-subcategories');

  set(expense, 'amount', 1000);
  assert.equal(get(category, 'amount'), 1126, 'It should be recalculated on changing amount inside expense');

  run(()=> expense.destroyRecord());
  assert.equal(get(category, 'amount'), 126, 'It should be recalculated on removing expense');

  run(()=> subCategory1.destroyRecord());
  assert.equal(get(category, 'amount'), 116, 'It should be recalculated on removing subcategory');
});
