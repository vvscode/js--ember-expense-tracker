import Ember from 'ember';

export const NO_NAME = 'Uncategorized';

export function expenseCategoryName([category, defaultName = 'Untitled']/*, hash*/) {
  if (!category) {
    return NO_NAME;
  }
  return category.title || defaultName;
}

export default Ember.Helper.helper(expenseCategoryName);
