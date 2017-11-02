import axios from 'axios';

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
