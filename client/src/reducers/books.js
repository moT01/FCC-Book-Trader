import { LOAD_ALL_BOOKS, BOOKS_AND_MESSAGE } from '../actions/types';

const initialState = {
  allBooks : [],
  message : ''
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case LOAD_ALL_BOOKS:
      return {
        allBooks: action.allBooks
      }
    case BOOKS_AND_MESSAGE:
      return {
        allBooks: action.allBooks,
        message: action.messages
      }
    default: return state;
  }
}
