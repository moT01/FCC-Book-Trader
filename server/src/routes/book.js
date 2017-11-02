import express from 'express';
import books from '../models/books'
import user from '../models/users'
let router = express.Router();

router.get('/allBooks',(req,res,next)=>{
    books.find()
    .then(r=>res.send(r))
    .catch(e=>res.send(e))
})
router.get('/addBook/:isbn/:username', (req, res, next) => {
    let username = req.params.username;
    let isbn = req.params.isbn;
    //first part is to check if the username is valid
    async function addBook() {
        let isValidUser = await user.find({ username: username })
        isValidUser = isValidUser.length;
        if (isValidUser == 0) {
            res.send("invalid user")
        } else {
            let newBook = new books();
            newBook.isbn=isbn;
            newBook.name= "test";
            newBook.current_owner= username;
            let result = await newBook.save();
            res.send(result)
        }
    }
    addBook()
    //res.json({user:username,isbn:isbn})
})

export default router;