import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    profile:{
        type: String,
        
    },
    about:{
        type: String,
        trim: true,
        maxlength:500
    },
    gender:{
        type: String
    },
    website:{
        type: String
    },
    email:{
        type: String,
        required: true,
        validate:{
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true
    },
    password:{
        type: String,
        required: true,
        // minlength:3,
        select: false
    },
    
})

userSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch= await bcrypt.compare(userPassword, this.password);
    return isMatch
}

export default mongoose.model("user", userSchema)