const express=require("express");
const {SocialMediaModel}=require("../models/socialmedia.model");
const socialmediapostRouter=express.Router()


socialmediapostRouter.get("/",async(req,res)=>{
    try{
        let data=await SocialMediaModel.find();
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})

socialmediapostRouter.post("/post",async(req,res)=>{
    const payload=req.body;
    try{
        let new_post=new SocialMediaModel(payload);
        await new_post.save()
        res.send({message:`User Posted at ${new_post.createdAt}`})
    }
    catch(err){
        console.log(err)
    }
})

socialmediapostRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;

    const social=await SocialMediaModel.findOne({"_id":id})
    console.log(social)
    const userID_in_social=social.userID;
     const userID_making_req=req.body.userID;

    try{
        if(userID_making_req!==userID_in_social){
            res.send({"msg":"You are not authorized"})
        }
        else{
            const social=await SocialMediaModel.findByIdAndUpdate({_id:id},payload)
            res.send({message:`Post updated at ${social.updatedAt}`})
        }
    }
    catch(err){
        console.log(err)
    }
})

socialmediapostRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;

    const social=await SocialMediaModel.findOne({"_id":id})
    console.log(social)
    const userID_in_social=social.userID;
     const userID_making_req=req.body.userID;

    try{
        if(userID_making_req!==userID_in_social){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await SocialMediaModel.findByIdAndDelete({_id:id})
            res.send({message:`Post deleted at ${social.updatedAt}`})
        }
       
    }
    catch(err){
        console.log(err)
    }
})

module.exports={socialmediapostRouter}