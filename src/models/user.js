const mongoose = require("mongoose")

// create a model for user schema

const userSchema = new mongoose.Schema({
firstname: {type:String},
lastname: {type:String},
password:{type:String},
role:{type:String},
age:{type:Number}

})
module.exports = mongoose.model("User",userSchema)