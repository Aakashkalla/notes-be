import express from "express";
import { connectDB } from './db.js';


const app = express();
app.use(express.json());

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