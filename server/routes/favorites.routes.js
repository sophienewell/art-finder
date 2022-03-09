const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate.middleware");
const {
  addFavorite,
  removeFavorite,
  getByUserId,
} = require("../models/favorites.models");

router.get("/", authenticate, (req, res) => {
  getByUserId(res, req.user.id);
});

router.delete("/remove/:id/", authenticate, (req, res) => {
  removeFavorite(res, req.params.id, req.user.id);
});

router.put("/add", authenticate, (req, res) => {
  const { art_id, title, artist, date, imageId } = req.body;
  if (!art_id || !title || !imageId) {
    return res.send({
      data: null,
      success: false,
      error: "Invalid data provided",
    });
  }

  const art = {
    user_id: req.user.id,
    art_id,
    title,
    artist,
    date,
    imageId,
  };
  addFavorite(res, art);
});

module.exports = router;
