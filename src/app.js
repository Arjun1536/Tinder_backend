const express = require("express")
// connect database
require("./config/database")
const app = express()

const Port = 3000;

// app.use('/',(req,res)=>{
//     res.send("the server runnning on UI")
// })
// app.use('/home',(req,res)=>{
//     res.send("this is home page")
// })

// Ordering matter a lot

app.get('/ab*c',(req,res)=>{ //query route
    console.log(req.query)
    res.send({firstName: 'Arjun Singh', role: 'Developer'})
})

app.get('/arjun/:userId/:name',(req,res)=>{ //dynamic route
    console.log(req.params)
    res.send("User information get successfully")
})

// route can be many case like 
// /a*b, /a+c,regex also like /*abc$ menas end with abc
// req.query, req.param -> dyamic route

//Middleware route handling

app.get('/user',(req,res,next)=>{ // we can pass these route in array form also
    res.send("first route ")
    next()
},(req,res,next)=>{
    console.log("2nd route")
    //res.send("second Route")
    next()
},
(req,res)=>{
    console.log("3rd route")
    res.send("third route")
}
) // we can have multiple route handlers using next to pass the next route but we have only one res.send("")
// route other wise getting error


app.listen(Port, ()=>{
    console.log(`the server runinng on ${Port}`)
})

