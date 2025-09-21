const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://arjun15:AJwpLU0ZRIGs7jTE@cluster0.7em6vn4.mongodb.net/Tinder_app")
}

connectDB().then(()=>{
    console.log("Database connect successfully")
})
.catch((err)=>{
    console.log(err)
})