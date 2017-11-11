import { SET_CURRENT_USER, CHANGE_SETTINGS} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zipcode: ''  
  }
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
      case SET_CURRENT_USER:
        return {
          isAuthenticated: !isEmpty(action.user),
          user: action.user
        }
      case CHANGE_SETTINGS:
        return { ...state,
	         user: { ...state.user,
	           lastName: action.settings.firstName,
	           firstName: action.settings.lastName,
	           city: action.settings.city,
	           state: action.settings.state,
	           zipcode: action.settings.zipcode
	         }
        }
      default: return state;
    }
}
