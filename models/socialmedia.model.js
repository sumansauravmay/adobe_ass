const mongoose=require("mongoose")
const socialmediaSchemna=mongoose.Schema({
userID:String,
content:String,
likes:{type:Number,required:false}
},
{
    timestamps: true
}
)

const SocialMediaModel=mongoose.model("posts",socialmediaSchemna);
module.exports={SocialMediaModel}
