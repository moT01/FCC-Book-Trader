import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import books from './reducers/books';

export default combineReducers({
  flashMessages,
  auth,
  books
});
