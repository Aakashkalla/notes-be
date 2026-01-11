import express from "express";
import { connectDB } from './db.js';
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { noteRouter } from "./routes/notes.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/notes', noteRouter);

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