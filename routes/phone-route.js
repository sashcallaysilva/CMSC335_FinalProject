const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Phone verification route working");
});

module.exports = router;