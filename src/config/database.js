const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://arjun15:AJwpLU0ZRIGs7jTE@cluster0.7em6vn4.mongodb.net/Tinder_app")
}

module.exports = connectDB
