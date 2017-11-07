import React, { Component } from 'react';
import { getAllBooks } from '../../actions/bookActions';
import Book from '../common/Book';
import { connect } from 'react-redux';

class Books extends Component { 
  componentWillMount() {
    this.props.getAllBooks();
  }

  render() {
    return (
      <div className="manyBooksContainer">
        {this.props.allBooks.filter(book => book.current_owner !== this.props.username).map((book, index) =>
          <Book key={index} book={book} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
    	username: state.auth.user.username,
      allBooks: state.books.allBooks
    }
}

export default connect(mapStateToProps, {getAllBooks})(Books);
