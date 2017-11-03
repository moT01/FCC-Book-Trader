import React from 'react';
import { GetIfIsMyBook } from './BookConditionals';

class Book extends React.Component {
  render() {
    return (
      <div className="singleBookContainer">
        <div className="bookTitle">{this.props.book.title}</div>

        <div className="text-center">
          <img className="bookImage text-center" src={this.props.book.image[0].medium} alt="☒" />
        </div>
        
        <ul className="bookDetailsContainer">
          <li className="bookDetail">{this.props.book.authors[0]}</li>
          <li className="bookDetail">{this.props.book.publisher}</li>
          <li className="bookDetail">{this.props.book.ISBN}</li>
          <li className="bookDetail">{this.props.book.bookUrl}</li>
        </ul>
        
        <div className="text-right">
          <GetIfIsMyBook userID={this.props.userID} />
        </div>        
      </div>    
    );
  }
};

export default Book;