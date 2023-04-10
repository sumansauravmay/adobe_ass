const express=require("express");
const {userRoute}=require("./routes/user.route");
const {authenticate}=require("./middleware/authenticate.middleware")
const {socialmediapostRouter}=require("./routes/socialmedia.routes")
const {connection}=require("./config/db")
require("dotenv").config()
const cors=require("cors")

app=express();

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use("/",userRoute)
app.use(authenticate)
app.use("/",socialmediapostRouter)

app.listen(process.env.port,async()=>{
    try{
await connection;
console.log(`port is running on ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})

