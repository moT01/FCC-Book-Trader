import { LOAD_ALL_BOOKS } from '../actions/types';

const initialState = {
  allBooks : []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case LOAD_ALL_BOOKS:
      return {
        allBooks: action.allBooks
      }
    default: return state;
  }
}
