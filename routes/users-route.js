const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find().sort({createdAt: -1})
  .then(users => {
    res.render("user-list", { users });
  })
  .catch(err => {
    console.error(err);
    res.send("Error loading user list.");
  });
});

module.exports = router;