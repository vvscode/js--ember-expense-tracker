import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

const string = attr('string');
const number = attr('number');
const date = attr('date');

export default Model.extend({
  amount: number,
  category: belongsTo('expense-category', { inverse: 'expenses' }),
  date,
  description: string,
  title: string
});
