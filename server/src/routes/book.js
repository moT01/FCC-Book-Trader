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
            let output = await resApi.json();
            output = output[`ISBN:${isbn}`];

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

router.post('/deleteBook/:id', (req, res) => {
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
     	console.log(message);
       books.find()
           .then(r=>res.send([r,message]))
           .catch(e=>res.send([e,message]));
     }
 }

 deleteBookID(_id);
});

router.patch('/requestBook', (req, res) => {
	const {_id, username} = req.body;

   let message = {'messageType': 'success', 'messageMessage': 'Book Requested'};
   let error;

  async function request(_id, username){
     try{
       await books.findOne({"_id":_id}, function (err, book) {
           console.log(book.requested_From);
           console.log(username);
           book.requested_From.push(username);
           book.save();
         });
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

 request(_id, username);
});

router.patch('/unrequestBook', (req, res) => {
	const {_id, username} = req.body;
	console.log('id='+_id);
	console.log('username='+username);
   let message = {'messageType': 'success', 'messageMessage': 'Book Unrequested'};
   let error;

   async function unrequest(_id, username){
     try{
       await books.findOne({"_id":_id}, function (err, book) {
           console.log(book.requested_From);
           console.log(username);
           let index = book.requested_From.indexOf(username);
           if (index > -1) {
              book.requested_From.splice(index, 1);
            }
           book.save();
         });
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
   unrequest(_id, username);
});

router.patch('/acceptOffer', (req, res) => {
	const {_id, username, reqUsername} = req.body;
   let message = {'messageType': 'success', 'messageMessage': 'Offer Accepted'};
   let error;
   async function accept(_id, username, reqUsername){
     try{
       await books.findOne({"_id":_id}, function (err, book) {
           console.log(book.requested_From);
           console.log(username);
           book.requested_From = [reqUsername];
           book.request_accepted = true;
           book.save();
         });
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
   accept(_id, username, reqUsername);
});

export default router;
