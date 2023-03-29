const Ticket = require("../models/ticket");
const Project = require("../models/project");
const { v4: uuidv4 } = require("uuid");

// -- GET -- //
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.status(200).json(tickets);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// -- POST -- //
const addTicket = async (req, res) => {
    try {
        const {
            title,
            desc,
            author,
            status,
            priority,
            type,
            timeEstimate,
            projectName,
            assignedDevs,
        } = req.body;
        const newTicket = await Ticket.create({
            title,
            desc,
            author,
            status,
            priority,
            type,
            timeEstimate,
            projectName,
            assignedDevs,
        });
        res.status(201).json({
            msg: "A new ticket has been successfully created.",
            newTicket,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// -- PATCH -- //
const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, poster } = req.body;
        const ticket = await Ticket.findById(id);
        const date = new Date();
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            day: "numeric",
        };
        const dateString = date.toLocaleDateString("en-US", options);

        await ticket.comments.push({
            poster,
            comment,
            createdAt: dateString,
            id: uuidv4(),
        });
        await ticket.save();
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentId } = req.body;
        const ticket = await Ticket.findById(id);
        const newComments = await ticket.comments.filter(
            (comment) => comment.id !== commentId
        );
        ticket.comments = newComments;
        await ticket.save();
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ msg: "Ticket not found." });
        ticket.status = status;
        await ticket.save();
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// -- DELETE -- //
const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (!deletedTicket)
            return res.status(404).json({ msg: "Project not found." });
        res.status(200).json(deletedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTickets,
    getTicketById,
    addTicket,
    addComment,
    editTicketStatus,
    deleteTicket,
    deleteComment,
};
