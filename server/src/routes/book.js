import express from 'express';
import axios from 'axios';
import { without } from 'lodash';
import authenticate from '../middlewares/authenticate';
import books from '../models/books';
import user from '../models/users';

//var isbn = require('node-isbn');
let fetch = require('node-fetch');
let router = express.Router();

router.put('/allBooks',(req,res)=>{
   books.find()
   .then(r=>res.send(r))
   .catch(e=>res.send(e))
});

router.get('/addBook/:isbn/:username', (req, res, next) => {
    let username = req.params.username;
    let isbn = req.params.isbn;
    //first part is to check if the username is valid
    async function getBookFromIsbn(isbn,username){
        try{
            // console.log(isbn);
            //api of openbooks which returns the book details for the given isbn number
            let url = "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn+"&jscmd=data&format=json"
            // console.log(url);
            let response = await fetch(url);
            let output = await response.json()
            //output= JSON.stringify(output)
            output = output[`ISBN:${isbn}`];
            let result = {
                title: output.title,
                publisher: output.publishers[0].name,
                ISBN: parseInt(isbn),//book proprty of books model is number
                image: typeof(output.cover)=="undefined"?[{noImg:true}]:output.cover,
                bookUrl: output.url,
                authors: output.authors.map(author => author.name),
                current_owner:username
            }
            //let addNewBook = new books(result);did not work
            let addNewBook = new books();
            addNewBook.title=result.title;
            addNewBook.publisher=result.publisher;
            addNewBook.ISBN = result.ISBN;
            addNewBook.image = result.image;
            addNewBook.bookUrl = result.bookUrl;
            addNewBook.authors = result.authors;
            addNewBook.current_owner = result.current_owner;
            console.log(addNewBook);
            let bookSaved = await addNewBook.save();
            res.json(bookSaved)
        }catch(e){
            res.send(e);
        }
        
    }
    async function addBook() {
        let isValidUser = await user.find({ username: username })
        isValidUser = isValidUser.length;
        if (isValidUser == 0) {
            res.send("invalid user")
        } else {
            let result = await getBookFromIsbn(isbn,username);
            // let newBook = new books();
            // newBook.isbn=isbn;
            // newBook.name= "test";
            // newBook.current_owner= username;
            // let result = await newBook.save();
            //res.send(result)
        }
    }
    addBook()
    //res.json({user:username,isbn:isbn})
});

export default router;