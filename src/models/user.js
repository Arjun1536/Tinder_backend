const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// create a model for user schema

const userSchema = new mongoose.Schema({
firstname: {type:String},
lastname: {type:String},
password:{type:String},
role:{type:String},
age:{type:Number}

})

//! add jwt logic in schema
userSchema.methods.getJWT = async function(){
    const user = this
    const token = jwt.sign({_id: user._id}, "JSON_token_arjun",{expiresIn:"1d"})
    return token
}

//! add bcrypt logic in schema
userSchema.methods.validateBcrypt = async function(passwordbyUser){
    const user = this
    const passwordHash = user.password
    const isValidPassword = await bcrypt.compare(passwordbyUser, passwordHash);
    return isValidPassword
}


module.exports = mongoose.model("User",userSchema)