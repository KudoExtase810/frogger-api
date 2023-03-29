const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    editUserInfo,
    assignUserRole,
    deleteUser,
} = require("../controllers/users.js");
const verifyToken = require("../middleware/auth");

router.get("/all", verifyToken, getAllUsers);
router.put("/:id", verifyToken, editUserInfo);
router.patch("/:id", verifyToken, assignUserRole);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
