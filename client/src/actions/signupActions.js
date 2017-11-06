import axios from 'axios';
import { CHANGE_ZIP } from './types';

export function updateZip(zipcode) {
  return {
    type: CHANGE_ZIP,

    zipcode
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

export function changeZip(data) {
  return dispatch => {
    return axios.post('/api/users/zipcode', data).then(res => {
      const {zipcode} = res.data;
      dispatch(updateZip(zipcode));
    });
  }
}
