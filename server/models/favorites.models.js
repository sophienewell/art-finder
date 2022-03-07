const query = require("../config/mysql.conf");

async function addFavorite(res, art) {
  try {
    let { insertId } = await query("INSERT INTO favorites SET ?", [art]);
    return res.send({
      data: insertId,
      success: true,
      error: null,
    });
  } catch (err) {
    return res.send({
      data: null,
      success: false,
      error: "Something went wrong. please try again later.",
    });
  }
}

async function removeFavorite(res, id) {
  try {
    await query("DELETE FROM favorites WHERE favorites.id= ?", [id]);
    return res.send({
      data: null,
      success: true,
      error: null,
    });
  } catch (err) {
    return res.send({
      data: null,
      success: false,
      error: "Something went wrong. please try again later.",
    });
  }
}

async function getByUserID(res, userId) {
  try {
    const arts = await query(
      "SELECT * FROM favorites WHERE favorites.user_id = ?",
      [userId]
    );
    return res.send({
      data: arts,
      success: true,
      error: null,
    });
  } catch (err) {
    return res.send({
      data: null,
      success: false,
      error: "Something went wrong. please try again later.",
    });
  }
}

module.exports = { addFavorite, removeFavorite, getByUserID };
