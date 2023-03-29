const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
    getTicketById,
    getAllTickets,
    addTicket,
    addComment,
    editTicketStatus,
    deleteTicket,
    deleteComment,
} = require("../controllers/tickets");
router.get("/all", verifyToken, getAllTickets);
router.post("/add", verifyToken, addTicket);
router.get("/:id", verifyToken, getTicketById);
router.patch("/status/:id", verifyToken, editTicketStatus);
router.patch("/:id/comment", verifyToken, addComment);
router.patch("/:id/comments/delete", verifyToken, deleteComment);
router.delete("/:id", verifyToken, deleteTicket);

module.exports = router;
