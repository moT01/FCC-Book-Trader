import React from 'react';
import { GetIfIsMyBook } from './BookConditionals';

class Book extends React.Component {
  render() {
    return (
      <div className="singleBookContainer" title={this.props.book.title}>
        <img className="bookImage" src={this.props.book.image[0].medium} alt="☒" />
        
        <ul className="bookDetailsContainer">
          <li className="bookDetail">{this.props.book.authors[0]}</li>
          <li className="bookDetail">{this.props.book.publisher}</li>
          <li className="bookDetail">{this.props.book.ISBN}</li>
        </ul>
        
        <div className="bookButtonContainer">
          <a className="btn btn-primary btn-left" href={this.props.book.bookUrl} target="_blank">more info</a>
          <GetIfIsMyBook book={this.props.book} userID={this.props.userID} username={this.props.username} />
        </div>        
      </div>
    );
  }
};

export default Book;