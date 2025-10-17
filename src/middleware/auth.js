const jwt = require("jsonwebtoken")
const User = require("../models/user") //schema import
const UserAuth = async (req,res,next)=>{
try{
  const {token } = req.cookies;   //! read the token from cookies
  if (!token){
    res.send("error in token")
  }
    const userObj = await jwt.verify(token,"JSON_token_arjun")
    const {_id} = userObj

    const user = await User.findById(_id)
    if(!user){
        throw new Error("user not found in middle")
    }
    req.user = user
    next()
}
catch(err){
    res.status(400).send("error in auth"+ err.message)
}
  
}

module.exports = {UserAuth}