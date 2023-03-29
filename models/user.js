const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 6,
        maxLength: 18,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        minLength: 6,
        maxLength: 48,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, minLength: 6, maxLength: 256, required: true },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Developer", "Project Manager"],
    },
    protected: {
        type: Boolean,
        default: false,
    },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
