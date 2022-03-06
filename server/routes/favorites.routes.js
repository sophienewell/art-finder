const express = require("express");
const router = express.Router();
const {
  addFavorite,
  removeFavorite,
  getByUserID,
} = require("../models/favorites.models");

router.get("/api/favorites/:user_id", (req, res) => {
  getByUserID(res, req.params.user_id);
});

router.delete("/api/favorites/remove/:id", (req, res) => {
  removeFavorite(res, req.params.id);
});

router.put("/api/favorites/add", (req, res) => {
  const { user_id, art_id, title, url } = req.body;
  if (!user_id || !art_id || !title || !url) {
    return res.send({
      data: null,
      success: false,
      error: "Invalid data provided",
    });
  }

  const art = { user_id, art_id, title, url };
  addFavorite(res, art);
});

module.exports = router;
