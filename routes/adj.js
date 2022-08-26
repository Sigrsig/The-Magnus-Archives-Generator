const { Router } = require("express");
const express = require("express");
const data = require("../wordLists/adjectivelist.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(data);
});

module.exports = router;
