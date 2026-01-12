import express from "express";
import { connectDB } from './db.js';
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { noteRouter } from "./routes/notes.routes.js";
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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