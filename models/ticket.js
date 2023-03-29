const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        projectName: { type: String, required: true },
        desc: { type: String },
        status: {
            type: String,
            enum: ["New", "In Progress", "Resolved"],
            required: true,
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Immediate"],
            required: true,
        },
        type: {
            type: String,
            enum: ["Issue", "Bug", "Error", "Feature Request"],
            required: true,
        },
        timeEstimate: { type: Number },
        comments: { type: [mongoose.Schema.Types.Mixed] },
        assignedDevs: { type: [String] },
    },
    { timestamps: true }
);
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;
