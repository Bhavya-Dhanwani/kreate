// Importing modules
import mongoose from "mongoose";
import { MONGODB_URI } from "./env.config.js";
import dns from "dns";

// Changing the dns settings
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Funciton to connect the DB
async function connectDB() {

    // Connect the DB in the try cathc block to detect the errors 
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Mongo DB Connected");
    } catch (err) {
        console.log("Error connecting the DATABASE", err);
    }
}

connectDB();

export default connectDB;