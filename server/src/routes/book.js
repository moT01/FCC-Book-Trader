import express from 'express';
import books from '../models/books'
import user from '../models/users'
let router = express.Router();

router.get('/allBooks',(req,res,next)=>{
    books.find()
    .then(r=>res.send(r))
    .catch(e=>res.send(e))
})


export default router;