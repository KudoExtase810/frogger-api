const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
    getAllProjects,
    addProject,
    deleteProject,
    getProjectByName,
    addTeamMember,
    deleteTeamMember,
} = require("../controllers/projects");

router.get("/all", verifyToken, getAllProjects);
router.get("/:name", verifyToken, getProjectByName);

router.post("/add", verifyToken, addProject);
router.patch("/:name/addmember", verifyToken, addTeamMember);
router.patch("/:projectName/remove", verifyToken, deleteTeamMember);

router.delete("/:id", verifyToken, deleteProject);

module.exports = router;
