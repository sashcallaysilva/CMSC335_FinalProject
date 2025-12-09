const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const indexRoute = require("./routes/index-route.js");
const generateRoute = require("./routes/generate-route.js");
const usersRoute = require("./routes/users-route.js");
const phoneRoute = require("./routes/phone-route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/", indexRoute);
app.use("/generate-user", generateRoute);
app.use("/user-list", usersRoute);
app.use("/phone-verification", phoneRoute);

app.use((req, res) => {
  res.status(404).render("404", { url: req.url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));