const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserProfile = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },


    Nickname:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:true
    },
    student:{
        type:Boolean,
        required:false

    },
    phoneNumber:{
        type:Number,
        required:true
    },
    nextOfKin:{
        type:String,
        required:true
    },
    nextOfKinAdress:{
      type:String,
      required:true
    },
    address:{
        type:String,
        required:true
    },

    education:[
        {
            schoolName:{
                type:String
            },
            fieldOfStudy:{
                type:String,
            },
            degree:{
                type:String
            }
        }
    ]




});
const  profile = mongoose.model('profile', UserProfile);
module.exports=profile;
