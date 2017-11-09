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
   let error;
   let response;

     //first part is to check if the username is valid
     async function getBookFromIsbn(isbn,username){
        try{
            //api of openbooks which returns the book details for the given isbn number
            let url = "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn+"&jscmd=data&format=json";
            let resApi = await fetch(url);
            //let axiosGet = await axios.get(url);
            //let axiosGet = await axios.get(url);
            // console.log(resApi);
            // console.log("111111111111111111111");
            // console.log(axiosGet);
            // console.log("###############################################################");
            let output = await resApi.json();
            output = output[`ISBN:${isbn}`];
            console.log(output);
            //save as a model
            var newBook = new books ({
              ISBN: parseInt(isbn),
              title: output.title,
              current_owner: username,
              publisher: output.publishers[0].name,
              image: output.cover,
              bookUrl: output.url,
              authors: output.authors.map(author => author.name)
            });

            //save in the db
            response = await newBook.save();
        }catch(e){
            console.log("log: " + e);
            if( e = {TypeError: "Cannot read property 'title' of undefined"}){
              message = {'messageType': 'error', 'messageMessage': 'book not found'};
            }else{
              message = {'messageType': 'error', 'messageMessage': 'server error'};
            }

            response = {}
            error = e;
        }finally{

          books.find()
              .then(r=>res.send([r,message]))
              .catch(e=>res.send([e,message]));
        }
    }

    getBookFromIsbn(isbn,username);
});

router.delete('/deleteBook/:id', (req, res) => {
	const _id = req.params.id;
   let message = {'messageType': 'error', 'messageMessage': 'Book Removed'};
   let error;

	console.log(_id);
  async function deleteBookID(_id){
     try{
       var deleted = await books.remove({_id:_id});
     }catch(e){
         console.log("log: " + e);
         message = {'messageType': 'error', 'messageMessage': 'server error'};
         error = e;
     }finally{
       books.find()
           .then(r=>res.send([r,message]))
           .catch(e=>res.send([e,message]));
     }
 }

 deleteBookID(_id);
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
