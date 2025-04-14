import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [6, "your email must have 5 character"],
        lowerCase: true,
        trim: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
        select: false,
        trim: true,
    },
    comfirmPassword: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {timestamp :true});

const User = mongoose.model("User", userSchema);
export default User;