const validator = require('validator')

const validationSignup = (req)=>{
const {firstname,lastname,role,password,age} = req.body
if (!firstname || !lastname){
    throw new Error("First name is not valid")
}


else if(!validator.isStrongPassword(password)){
throw new Error("password is not strong enough")
}
else{
    throw new console.error();
    
}
}

module.exports = {validationSignup}