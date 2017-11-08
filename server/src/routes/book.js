import express from 'express';
import axios from 'axios';
import { without } from 'lodash';
import authenticate from '../middlewares/authenticate';
import books from '../models/books';
import user from '../models/users';

//var isbn = require('node-isbn');
let fetch = require('node-fetch');
let router = express.Router();

router.get('/allBooks',(req,res)=>{
   books.find()
   .then(r=>res.send(r))
   .catch(e=>res.send(e))
});

router.post('/addBook', (req, res) => {
	//this is what gets sent to /addBook
	const {isbn, username} = req.body;
   let message = {'messageType': 'success', 'messageMessage': 'ISBN Added'};

   //here's the variables
   //try adding a book in the myBooks page to see the logs
	//console.log('username='+username);	
	//console.log('isbn='+isbn);

   //i want the response to look like this
	// [allBooks, message]
	//as shown below
	//there's two message types
	//one message is shown above
	//if the isbn is not found
	//send this message back...
  //var message = {'messageType': 'error', 'messageMessage': 'ISBN Not Found'};

	books.find().then(r => res.send([r, message]) );
   //if there's complications we can change some things
   
     /* 
     //first part is to check if the username is valid
     async function getBookFromIsbn(isbn,username){
        try{
            // console.log(isbn);
            //api of openbooks which returns the book details for the given isbn number
            let url = "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn+"&jscmd=data&format=json";
            // console.log(url);
            let response = await fetch(url);
            let output = await response.json()
            //output= JSON.stringify(output)
            output = output[`ISBN:${isbn}`];

            console.log(output);
            /*let result = {
                title: output.title,
                publisher: output.publishers[0].name,
                ISBN: parseInt(isbn),//book proprty of books model is number
                image: typeof(output.cover)=="undefined"?[{noImg:true}]:output.cover,
                bookUrl: output.url,
                authors: output.authors.map(author => author.name),
                current_owner:username
            }

            //console.log(result);
            //let addNewBook = new books(result);did not work
            // let addNewBook = new books();
            // addNewBook.title=result.title;
            // addNewBook.publisher=result.publisher;
            // addNewBook.ISBN = result.ISBN;
            // addNewBook.image = result.image;
            // addNewBook.bookUrl = result.bookUrl;
            // addNewBook.authors = result.authors;
            // addNewBook.current_owner = result.current_owner;
            // console.log(addNewBook);
            // let bookSaved = await addNewBook.save();
            // res.json(bookSaved)
        }catch(e){
            console.log(e)
            //res.send(e);
        }

    }
    getBookFromIsbn();
    // async function addBook() {
    //     let isValidUser = await user.find({ username: username })
    //     isValidUser = isValidUser.length;
    //     if (isValidUser == 0) {
    //         res.send("invalid user")
    //     } else {
    //         let result = await getBookFromIsbn(isbn,username);
    //         // let newBook = new books();
    //         // newBook.isbn=isbn;
    //         // newBook.name= "test";
    //         // newBook.current_owner= username;
    //         // let result = await newBook.save();
    //         //res.send(result)
    //     }
    // }
    // addBook()
    //res.json({user:username,isbn:isbn})*/
});

router.delete('/deleteBook', (req, res) => {
	const {isbn} = req.body;
   let message = {'messageType': 'error', 'messageMessage': 'Book Removed'};
   
   //here's the variables
   //try deleting a book in the myBooks page if the option is there to see the logs
	console.log('isbn='+isbn);
	
   //i want the response to look like this	
	// [allBooks, message]
	//as shown at the bottom
	
	//so in here we need to delete the book
	//then send the response

	books.find().then(r => res.send([r, message]) );
});

router.patch('/requestBook', (req, res) => {
	const {isbn, username} = req.body;
   let message = {'messageType': 'success', 'messageMessage': 'Book Requested'};
   
   //here's the variables
   //try requesting a book in myBooks if the option is there to see the logs
	console.log('isbn='+isbn);
	
   //i want the response to look like this	
	// [allBooks, message]
	//as shown at the bottom
	
	//so in here we need to add the userId to the books requestedFrom array
	//then send the response
	
	books.find().then(r => res.send([r, message]) );
});

router.patch('/unrequestBook', (req, res) => {
	const {isbn, username} = req.body;
   let message = {'messageType': 'success', 'messageMessage': 'Book Unrequested'};
   
   //here's the variables
	//console.log('username='+username);
	//console.log('isbn='+isbn);
	
   //i want the response to look like this	
	// [allBooks, message]
	//as shown below
	
	//here we need to remove the username from the requestedFrom array in the bookModel of the isbn
	//then send the response
	
	books.find().then(r => res.send([r, message]) );
});

router.patch('/acceptOffer', (req, res) => {
	const {isbn, username} = req.body;
   let message = {'messageType': 'success', 'messageMessage': 'Offer Accepted'};
   
   //here's the variables
	//console.log('username='+username);
	//console.log('isbn='+isbn);
	
   //i want the response to look like this	
	// [allBooks, message]
	//as shown below
	
	//here we need to change the current_owner of the book to username and either
	//remove that user from the requestedFrom array
	//or maybe just clear out that whole array?
	
	books.find().then(r => res.send([r, message]) );
});

export default router;
