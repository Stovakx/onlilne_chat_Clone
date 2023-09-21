import mongoose, { Validator }  from "mongoose";
import hashPassword from '../middleware/hashpassword';
import profilePhotoPath from '../middleware/profilePhotoPath';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    }, 
    email:{
        type: String,
        required: true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        Validator(value){
            if (!Validator.isLength(value, {min: 8})) {
                throw new Error('Password must have at least 8 letters.')
            }
            if (!/[A-Z]/.test(value)){
                throw new Error('Password must have at least 1 capital letter.')
            }
            if (!/\d/.test(value)){
                throw new Error('Password must have at least 1 digit.')
            }
        }
    },
    profilePhoto:{
        type: String,

    }
})

profilePhotoPath(userSchema);
hashPassword(userSchema);

export default mongoose.model('User', userSchema);