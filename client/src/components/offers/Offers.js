import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllBooks, unrequestBook, acceptOffer } from '../../actions/bookActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { GetIfOffer, GetIfRequest } from './OfferConditionals';
import './Offers.css';

class Offers extends Component {
  unrequestBook() {
  	 console.log('unrequest');
    this.props.unrequestBook(this.props.book.ISBN, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });    
    });
  }
  
  acceptOffer() {
  	 console.log('accept');
    this.props.acceptOffer(this.props.book.ISBN, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });    
    });
  }	
	
  componentWillMount() {
    this.props.getAllBooks();
  }
  
  render() {
    return (
      <div>
        <div className="offers">
          {this.props.allBooks.map((book, index) =>
            <GetIfOffer key={index} book={book} username={this.props.username} userID={this.props.userID} />
          )}
        </div>
        
        <div className="requests">
          {this.props.allBooks.map((book, index) =>
            <GetIfRequest 
              key={index} 
              book={book} 
              username={this.props.username} 
              userID={this.props.userID} 
              unrequestBook={this.props.unrequestBook.bind(this)}
              acceptOffer={this.props.acceptOffer.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  	 username: state.auth.user.username,
  	 id: state.auth.user.id,
    allBooks: state.books.allBooks
  }
}

export default connect(mapStateToProps, {getAllBooks, unrequestBook, acceptOffer, addFlashMessage})(Offers);
