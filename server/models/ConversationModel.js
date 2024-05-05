const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    seen:{
        type: Boolean,
        default: false
    }
},{timestamps:true})


const conversationSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    receiver:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    messages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Message"
        },
    ]
},{timestamps:true})


const MessageModel = mongoose.model('Message',messageSchema)
const ConversationeModel = mongoose.model('Message',conversationSchema)

module.exports = {
    MessageModel,
    ConversationeModel
}
