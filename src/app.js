const express = require("express")

const app = express()

const Port = 3000;

app.use('/',(req,res)=>{
    res.send("the server runnning on UI")
})
app.use('/home',(req,res)=>{
    res.send("this is home page")
})

app.listen(Port, ()=>{
    console.log(`the server runinng on ${Port}`)
})

