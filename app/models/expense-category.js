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

  selfExpensesAnounts: computed.mapBy('expenses', 'amount'),
  selfExpensesAnountsSum: computed.sum('selfExpensesAnounts'),
  subCategoriesAmounts: computed.mapBy('subCategories', 'amount'),
  subCategoriesAmountsSum: computed.sum('subCategoriesAmounts'),
  amount: computed('selfExpensesAnountsSum', 'subCategoriesAmountsSum', function() {
    return get(this, 'selfExpensesAnountsSum') +  get(this, 'subCategoriesAmountsSum');
  })
});
