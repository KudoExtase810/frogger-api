const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.js");
const projectsRoutes = require("./routes/projects.js");
const usersRoutes = require("./routes/users.js");
const ticketsRoutes = require("./routes/tickets.js");

// -- CONFIG -- //
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "https://frogger.netlify.app" }));

// -- ROUTES -- //
app.use("/auth", authRoutes);
app.use("/projects", projectsRoutes);
app.use("/users", usersRoutes);
app.use("/tickets", ticketsRoutes);

// -- MONGOOSE -- //
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server listening on port", PORT);
        });
    })
    .catch((error) => console.log(`${error}. Did not connect.`));
