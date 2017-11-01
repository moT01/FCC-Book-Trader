import {Schema,model} from 'mongoose'
const logs = new Schema({
    id:{
        //id of the book
        type:number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
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
        type:number,
        default:Date.now()
    },reciever:{
        //username of the reciever
        type:String,
        required:false
    }
})
module.exports = model('logs',logs);