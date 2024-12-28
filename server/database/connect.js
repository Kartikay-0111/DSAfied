import mongoose from "mongoose";

const connectDB = (url) =>{
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
    .then(()=> console.log("database connected"))
    .catch((e)=>{console.log("Database connection failed:", e.message)});
}

export default connectDB;