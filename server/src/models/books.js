let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: {
        //id of the book
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    current_owner: {
        // username of the owner
        type: String,
        required: true
    }
})
module.exports = mongoose.model('books', bookSchema);