const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// -- REGISTER USER -- //
const register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Checking for duplicate accounts
        const usernameCheck = await User.exists({ username: username });
        const emailCheck = await User.exists({ email: email });
        if (usernameCheck && emailCheck) {
            return res.status(400).json({
                msg: "An account with the same username & email already exists.",
            });
        }
        if (usernameCheck) {
            return res.status(400).json({
                msg: "An account with the same username already exists.",
            });
        }
        if (emailCheck) {
            return res.status(400).json({
                msg: "An account with the same email already exists.",
            });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            password: passwordHash,
            email,
            role,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

// -- LOGIN USER -- //
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        // CHECKING FOR PW & HASHEDPW MATCH

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });
        // JWT

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
                isProtected: user.protected,
            },
            process.env.JWT_SECRET
        );
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { register, login };
