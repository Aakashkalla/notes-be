import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.json({
        message : "Hello From Get"
    })
})

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log("DB Connected");
    }catch(e){
        console.log(e);
        throw new Error;
    }
}

async function serverStart(){
    try{
        await connectDB()
        app.listen(3000, async ()=>{
            console.log("Server Started");
        })
    }catch(e){
        console.log(e)
    }
}

serverStart()