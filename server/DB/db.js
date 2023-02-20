import mongoose from "mongoose";

const connectDB = (url)=>{
    console.log('Connected to DB...');
    mongoose.set("strictQuery", false);
    return mongoose.connect(url)
    
}
 
export default connectDB