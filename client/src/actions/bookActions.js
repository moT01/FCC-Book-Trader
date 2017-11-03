import axios from 'axios';
import {LOAD_ALL_BOOKS} from './types';

export function loadAllBooks(allBooks) {
  return {
    type: LOAD_ALL_BOOKS,
    allBooks
  };
}

export function getAllBooks() {
  return dispatch => {
    return axios.put('/api/book/allBooks').then(res => {
      const allBooks = res.data; 
      dispatch(loadAllBooks(allBooks));
    });
  }
}