import axios from 'axios';
import { CHANGE_SETTINGS } from './types';

export function updateSettings(settings) {
  return {
    type: CHANGE_SETTINGS,
    settings
  };
}
export function userSignupRequest(userData) {
  return disptach => {
    return axios.post('/api/users', userData).then(res => console.log(res));
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get('/api/users/' + identifier);
  }
}

export function changeSettings(data) {
  return dispatch => {
    return axios.post('/api/users/settings', data).then(res => {
      const token = res.data.token;
      const settings = res.data.user;
      localStorage.setItem('jwtToken', token);
      dispatch(updateSettings(settings));
    });
  }
}
