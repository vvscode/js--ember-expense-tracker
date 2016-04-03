import LSAdapter from 'ember-localstorage-adapter';
import config from '../config/environment';

export default LSAdapter.extend({
  namespace: config.APP.LS_NAMESPACE
});
