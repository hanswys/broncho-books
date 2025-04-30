import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
}, 
);

// creates a user object for database - add a new user to the user collection following the schema
const User = mongoose.model("User", userSchema);
export default User;