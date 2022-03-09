const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate.middleware");
const {
  addFavorite,
  removeFavorite,
  getByUserID,
} = require("../models/favorites.models");

router.get("/", authenticate, (req, res) => {
  getByUserID(res, req.user_id);
});

router.delete("/remove/:id/", authenticate, (req, res) => {
  removeFavorite(res, req.params.id, req.user_id);
});

router.put("/add", authenticate, (req, res) => {
  const { art_id, title, url } = req.body;
  if (!art_id || !title || !url) {
    return res.send({
      data: null,
      success: false,
      error: "Invalid data provided",
    });
  }

  const art = { user_id: req.user.id, art_id, title, url };
  addFavorite(res, art);
});

module.exports = router;
