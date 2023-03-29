const User = require("../models/user");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const editUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await User.findById(id);

        // TO PREVENT PEOPLE FROM MESSING WITH DATA
        if (user.protected) {
            return res.status(401).json({
                msg: "This user's info are protected and can only be updated by the website owner.",
            });
        }

        await User.findByIdAndUpdate(id, {
            username,
            email,
        });
        res.status(200).json({
            msg: "The user details have been updated successfully.",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { newRole } = req.body;
        const user = await User.findById(id);

        // TO PREVENT PEOPLE FROM MESSING WITH DATA
        if (user.protected) {
            return res.status(401).json({
                msg: "This user's info are protected and can only be updated by the website owner.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { role: newRole });
        res.status(200).json({
            msg: "New role assigned successfully.",
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        // TO PREVENT PEOPLE FROM MESSING WITH DATA
        if (user.protected) {
            return res.status(401).json({
                msg: "This user is protected and can only be deleted by the website owner.",
            });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { getAllUsers, editUserInfo, assignUserRole, deleteUser };
