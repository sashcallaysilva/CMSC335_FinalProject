const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users list route working");
});

module.exports = router;