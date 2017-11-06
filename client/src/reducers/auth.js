import { SET_CURRENT_USER, CHANGE_ZIP} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
      case SET_CURRENT_USER:
        return {
          isAuthenticated: !isEmpty(action.user),
          user: action.user
        }
      case CHANGE_ZIP:
        return { ...state,
          user: { ...state.user,
            zipcode: action.zipcode
          }
        }
      default: return state;
    }
}
