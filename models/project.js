const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 1,
        maxLength: 16,
    },
    desc: { type: String, maxLength: 124 },
    members: { type: [String], required: true },
});
const Project =
    mongoose.models.Project || mongoose.model("Project", ProjectSchema);
module.exports = Project;
