import React from 'react';
import NewBookForm from './NewBookForm';
import Books from './Books';

class MyBooksPage extends React.Component {
  render() {
    return(
      <div>
        <NewBookForm />
        <Books />
      </div>
    );
  }
}

export default MyBooksPage;
