import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://john12:122163@cluster0.eqhop.mongodb.net/Meba').then(()=>console.log("DB Connected"));
}