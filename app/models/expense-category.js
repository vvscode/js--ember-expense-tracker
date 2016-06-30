import Ember from 'ember';
import DS from 'ember-data';

const {
  attr,
  belongsTo,
  hasMany,
  Model
} = DS;

const {
  computed,
  get
} = Ember;

const string = attr('string');

export default Model.extend({
  description: string,
  expenses: hasMany('expense', { inverse: 'category' }),
  parentCategory: belongsTo('expense-category', { inverse: 'subCategories' }),
  subCategories: hasMany('expense-category', { inverse: 'parentCategory' }),
  title: string,

  selfExpensesAmounts: computed.mapBy('expenses', 'amount'),
  selfExpensesAmountsSum: computed.sum('selfExpensesAmounts'),
  subCategoriesAmounts: computed.mapBy('subCategories', 'amount'),
  subCategoriesAmountsSum: computed.sum('subCategoriesAmounts'),
  amount: computed('selfExpensesAmountsSum', 'subCategoriesAmountsSum', function() {
    return get(this, 'selfExpensesAmountsSum') +  get(this, 'subCategoriesAmountsSum');
  })
});
