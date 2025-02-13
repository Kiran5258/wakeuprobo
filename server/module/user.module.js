import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profilephoto:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    },
    isAuth:{
        type:Boolean,
        default:false,
    }
},{ timestamps: true,}
)
const User=mongoose.model('User',userschema)
export default User;  