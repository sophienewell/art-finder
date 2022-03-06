const express = require("express");
const router = express.Router();
const { login, signup } = require("../models/auth.models");
const minmax = require("../middleware/minmax_credentials.middleware");

router.post("/login", minmax, (req, res) => {
  login(res, req.body.username, req.body.password);
});

router.put("/signup", minmax, (req, res) => {
  signup(res, req.body.username, req.body.password);
});

module.exports = router;
