let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    ISBN: {
        //id of the book
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    current_owner: {
        // username of the owner
        type: String,
        required: true
    },
    publisher:String,
    image:{
        type:Object,
        default:{}
    },
    bookUrl:String,
    authors:{
        type:Array,
        default:[]
    },
    requested_From:{
      type:Array,
      default:[]
    },
    request_accepted:{
      type:Boolean,
      default:false
    }
})
module.exports = mongoose.model('books', bookSchema);
