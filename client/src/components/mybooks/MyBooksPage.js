import React from 'react';
import EventForm from './MyBooksForm';
import Books from './Books';

class MyBooksPage extends React.Component {
  render() {
    return(
      <div>
        <EventForm />
        <Books />
      </div>
    );
  }
}

export default MyBooksPage;
