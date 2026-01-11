import express from "express";
import { connectDB } from './db.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.json({
        message : "Hello From Get"
    })
})

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