import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
        index: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
        type: String,
        default: "https://icons.veryicon.com/png/o/miscellaneous/common-icons-31/default-avatar-2.png"
    },
    image: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/movie-app-c0ec1.firebasestorage.app/o/Image.png?alt=media"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true
    },
    token: {
        type: String
    }
  },
  {
    timestamps: true
  });

  export default mongoose.model("User", userSchema);