const express=require("express")
const {UserModel}=require("../models/user.model");
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt')
const userRoute=express.Router();

// userRoute.use("/",(req,res)=>{
//     res.send("Welcome to home Page")
// })



userRoute.post("/register",async (req,res)=>{
    const {email,bio,name, password}=req.body;
    try{
        bcrypt.hash(password, 5,async(err, secure_password)=>{
            // Store hash in your password DB.
    if(err){
        console.log(err)
    }
    else{
        const user=new UserModel({email,password:secure_password,name,bio});
        await user.save();
        res.send({message:`User registered at ${user.createdAt}`});
    }
        });
    }
    catch(err){
        res.send("err while doing registration")
    res.send(err)
    }
    })

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email});
        const hashed_pass=user[0].password; 
        if(user.length>0)
        {
      bcrypt.compare(password, hashed_pass, function(err, result) {
           // result == true
if(result){
    const token = jwt.sign({userID:user[0]._id}, 'masai');
    res.send({"msg":"Login successful","token":token,"userID":user[0]._id,"username":user[0].name});
}
else{
    res.send("wrong credential");
}
            });
        }
        else{
            res.send("Wrong credential!!")
        }
        
    }
    catch(err){
        res.send(err)
    } 
})


userRoute.patch("/update_user/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    try{
await UserModel.findByIdAndUpdate({_id:ID},payload)
res.send("Updated the name!!")
    }
    catch(err){
        console.log(err)
    }
})

userRoute.delete("/delete_user/:id",async(req,res)=>{
    const ID=req.params.id;
    try{
        await UserModel.findByIdAndDelete({_id:ID})
        res.send("Deleted the User")
    }
    catch(err){
        console.log(err)
    }
})

module.exports={userRoute}
