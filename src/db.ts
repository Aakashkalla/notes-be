import {env} from '../src/env.js'
import mongoose from 'mongoose';

export async function connectDB(){
    try{
        await mongoose.connect(env.MONGODB_URL);
        console.log("DB Connected");
    }catch(e){
        console.log(e);
        throw new Error;
    }
}