const Project = require("../models/project");
const User = require("../models/user");
const Ticket = require("../models/ticket");

const getProjectByName = async (req, res) => {
    try {
        const { name } = req.params;
        const project = await Project.findOne({ name });
        if (!project)
            return res.status(404).json({ msg: "Project not found." });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllProjects = async (req, res) => {
    try {
        const allProjects = await Project.find({});
        res.status(200).json(allProjects);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const addTeamMember = async (req, res) => {
    try {
        const { name } = req.params;
        const { members } = req.body;
        const project = await Project.findOne({ name });
        members.map(async (member) => {
            await project.members.push(member);
        });
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ msg: error.message });
        console.log(error);
    }
};

const addProject = async (req, res) => {
    try {
        const { name, desc, members } = req.body;
        const project = await Project.create({
            name,
            desc: desc || null,
            members,
        });
        res.status(201).json({ msg: "Project created successfully.", project });
    } catch (error) {
        res.status(500).json({ msg: error.message });
        console.log(error);
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject)
            return res.status(404).json({ msg: "Project not found." });

        const { name } = deletedProject;
        await Ticket.deleteMany({ projectName: name });

        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const { projectName } = req.params;
        const { member } = req.body;
        const project = await Project.findOne({
            name: projectName,
        });
        const newMembers = await project.members.filter(
            (teamMember) => teamMember !== member
        );
        project.members = newMembers;
        await project.save();
        res.status(200).json({ msg: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getProjectByName,
    getAllProjects,
    addProject,
    addTeamMember,
    deleteProject,
    deleteTeamMember,
};
