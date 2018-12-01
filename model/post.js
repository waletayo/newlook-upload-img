const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    negAble: {
        type: Boolean,
        default: false
    },
    contact: {
        type: String,
        required: true
    },
    otherIdM: {
        type: String
    },
    postImage:{
      type:String,
      required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }


});

const  post = mongoose.model('post',PostSchema);
module.exports=post;
