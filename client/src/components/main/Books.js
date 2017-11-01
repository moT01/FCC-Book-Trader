import React, { Component } from 'react';
import './Books.css';

//this is temp info - will come from db later
var allBooks = [
  {
  	 bookID: 1,
  	 bookTitle: 'this is a really really really long book title, that is really long.',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor1',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 2,  	
  	 bookTitle: 'bookTitle2',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'an author that has a really long name for some reason',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 3,
  	 bookTitle: 'bookTitle3',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor3',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 4,
  	 bookTitle: 'bookTitle4',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor4',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 5,
  	 bookTitle: 'bookTitle5',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor5',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 6,
  	 bookTitle: 'bookTitle6',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor6',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 7,
  	 bookTitle: 'bookTitle3',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor3',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 8,
  	 bookTitle: 'bookTitle4',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor4',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 9,
  	 bookTitle: 'bookTitle5',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor5',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 10,
  	 bookTitle: 'bookTitle6',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor6',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 7,
  	 bookTitle: 'bookTitle3',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor3',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 9,
  	 bookTitle: 'bookTitle4',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor4',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 8,
  	 bookTitle: 'bookTitle5',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor5',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 6,
  	 bookTitle: 'bookTitle6',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor6',
  	 bookReleased: '12-12-12'
  },
  {
  	 bookID: 7,
    bookTitle: 'bookTitle7',
  	 bookImage: './book-icon.png',
  	 bookAuthor: 'bookAuthor7',
  	 bookReleased: '12-12-12'
  }  
];

function GetIfIsMyBook(props) {
	//temp test -- will need to test if book owner id == user id - or maybe change it all
  if(props.id < 3) {	
    return <div className="btn btn-danger">Delete</div>
  }
  
  if(props.id < 5) {
    return <div className="btn btn-warning">Cancel Request</div>
  }  	
  	  
  return <div className="btn btn-primary">Request</div>
}

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: allBooks
    }
  }	 

  render() {
    return (
      <div className="manyBooksContainer">
        {this.state.allBooks.map((book, index) =>
          <div className="singleBookContainer">
		      <div className="bookTitle">{book.bookTitle}</div>
		      <div className="text-center">
              <img className="bookImage text-center" src={book.bookImage} alt="alt"/>
            </div>
            <ul className="bookDetailsContainer">
              <li className="bookDetail">{book.bookAuthor}</li>
              <li className="bookDetail">{book.bookReleased}</li>
            </ul>
            <div className="text-right">
              <GetIfIsMyBook id={book.bookID} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Books;
