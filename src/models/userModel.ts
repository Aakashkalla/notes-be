import mongoose, { Schema } from "mongoose";

interface User{
    email : string
    password : string
}

const userSchema = new Schema<User>({
    email:{
        type : String,
        unique : true,
        required : true
    },
    password:{
        type: String,
        required : true
    }
},{
    timestamps : true
})

export const UserModel = mongoose.model('User', userSchema)