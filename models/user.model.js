const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    bio:String,
    
},
{
    timestamps: true
})



const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}

// "name":"Suman Saurav",
// "email":"suman@gmail.com",
// "password":"s123",
// "bio":"I am developer"