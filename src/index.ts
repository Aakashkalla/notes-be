import express from "express";

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.json({
        message : "Server Started"
    })
})

app.listen(3000, ()=>{
    console.log("Server Started")
})
