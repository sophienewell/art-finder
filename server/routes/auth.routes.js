const express = require("express");
const router = express.Router();
const { login, signup } = require("../models/auth.models");
const minmax = require("../middleware/minmax_credentials.middleware");
const authenticate = require("../middleware/authenticate.middleware");

router.get("/verify", authenticate, (req, res) => {
  return res.send({
    data: { username: req.user.username },
    success: true,
    error: null,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  return res.send({ data: null, success: true, error: null });
});

router.post("/login", minmax, (req, res) => {
  login(res, req.body.username, req.body.password);
});

router.put("/signup", minmax, (req, res) => {
  signup(res, req.body.username, req.body.password);
});

module.exports = router;
