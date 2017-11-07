import axios from 'axios';
import {LOAD_ALL_BOOKS, BOOKS_AND_MESSAGE } from './types';

export function loadAllBooks(allBooks) {
  return {
    type: LOAD_ALL_BOOKS,
    allBooks
  };
}

export function allBooksPlusMessage(allBooks, messages) {
  return {
    type: BOOKS_AND_MESSAGE,
    allBooks,
    messages
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

export function addNewBook(data) {
  return dispatch => {
    return axios.post('/api/book/addBook', data).then(res => {
      const allBooks = res.data[0];
      const messages = res.data[1];
      dispatch(allBooksPlusMessage(allBooks, messages));
    });
  }
}
