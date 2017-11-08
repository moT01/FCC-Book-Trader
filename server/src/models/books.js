let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    ISBN: {
        //id of the book
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    current_owner: {
        // username of the owner
        type: String,
        required: true
    },
    publisher:String,
    image:{
        type:Array,
        default:[]
    },
    bookUrl:String,
    authors:{
        type:Array,
        default:[]
    },
    requestedFrom:{
      type:Array,
      default:[]
    },
})
module.exports = mongoose.model('books', bookSchema);