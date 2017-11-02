let mongoose= require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    id:{
        //id of the book
        type:Number,
        required:true,
        unique:false
    },
    name:{
        type:String,
        required:true,
        unique:false
    },
    username:{
        // user himself will the sender
        type:String,
        required:true
    },
    accepted:{
        type:Boolean,
        default:false
    },timestamp:{
        type:Number,
        default:Date.now()
    },reciever:{
        //username of the reciever
        type:String,
        required:false
    }
})
module.exports = mongoose.model('logs',logSchema);