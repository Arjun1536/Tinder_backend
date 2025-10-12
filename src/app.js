const express = require("express")
// connect database
const connectDB  = require('./config/database')
const User = require("./models/user")
const app = express()
const {validationSignup} = require("./utils/Validation")
const bcrypt  = require("bcrypt")

app.use(express.json())  //! adding middleware to read/update/push data in JSON

const Port = 3000;

connectDB().then(()=>{
    console.log("Database connect successfully")
    app.listen(Port, ()=>{ //^litle beter way to connect db then server
    console.log(`the server runinng on ${Port}`)
})
})
.catch((err)=>{
    console.log(err)
})

//* Validate signup before create
app.post("/signup",async(req,res)=>{
    

try{
    console.log("before validatioon")
    //validationSignup(req)
    console.log("validation passed")
    //! hash the password
    const {firstname,lastname,password,role,age} = req.body
    const hashPassword = await bcrypt.hash(password,10)
    console.log(hashPassword)
    const user = new User({
        firstname,lastname,role,age,password:hashPassword
    })
    await user.save()
    console.log("user saved data")
    res.send("data saved successfully")
}
catch(err){
res.status(404).send("Data not added successfully",err.message)
}

})


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ firstname: username });
    if (!user) {
      throw new Error("Invalid credential");
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Password is not correct");
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



//* find  role using model.find() and use model.findOne()

app.get("/getuser",async(req,res)=>{
    const newUserRole = req.body.role;

    try{
        const user = await User.find({role:newUserRole})
        res.send(user)
    }
    catch(err){
        res.status(404).send("something error in code",err)
    }
})

//* delete the user using findDeleteOne()

app.delete("/delete_user", async(req,res)=>{
    const userId = req.body.userId
    try{
        const user = await User.findByIdAndDelete(userId)
        res.status(200).send("user deleted successfully")
    }
    catch(err){
        res.status(400).send("something error with ",err)
    }
})

//*  update user data using FindbyIdAndUpdate()

app.patch("/update_user",async(req,res)=>{
   const {id,...data} = req.body
   try{
    const updated_data = await User.findByIdAndUpdate(id,data,{new:true})  //^new: false (default): returns the old document (before updating)
    res.status(200).send({message: updated_data})                          //^ new: true: returns the new updated document (after updating)
   }
   catch(err){
    res.status(404).send({message: "some error in code",err})
   }
})






// app.post("/user",(req,res)=>{
//    const user = new User({
//      firstname:"Arjun",
//     lastname:"Singh",
//     role:"reactJS developer",
//     age:"25"
//    })

//    try{
// user.save()
// res.send("data successfully added")
//    }
//    catch(err){
//     res.status(400).send("some error",err)
//    }

// })


// app.use('/',(req,res)=>{
//     res.send("the server runnning on UI")
// })
// app.use('/home',(req,res)=>{
//     res.send("this is home page")
// })

// Ordering matter a lot

// app.get('/ab*c',(req,res)=>{ //query route
//     console.log(req.query)
//     res.send({firstName: 'Arjun Singh', role: 'Developer'})
// })

// app.get('/arjun/:userId/:name',(req,res)=>{ //dynamic route
//     console.log(req.params)
//     res.send("User information get successfully")
// })

// route can be many case like 
// /a*b, /a+c,regex also like /*abc$ menas end with abc
// req.query, req.param -> dyamic route

//Middleware route handling

// app.get('/user',(req,res,next)=>{ // we can pass these route in array form also
//     res.send("first route ")
//     next()
// },(req,res,next)=>{
//     console.log("2nd route")
//     //res.send("second Route")
//     next()
// },
// (req,res)=>{
//     console.log("3rd route")
//     res.send("third route")
// }
// ) 
// we can have multiple route handlers using next to pass the next route but we have only one res.send("")
// route other wise getting error




