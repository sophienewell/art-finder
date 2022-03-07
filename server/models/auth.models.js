const query = require("../config/mysql.conf");
const bcrypt = require("bcrypt");

async function login(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (!user) {
      return res.send({
        data: null,
        success: false,
        error: "Invalid username or password",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send({
        data: null,
        success: false,
        error: "Invalid username or password",
      });
    }
    return res.send({
      data: { id: user.id, username: user.username },
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

async function signup(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user) {
      return res.send({
        data: null,
        success: false,
        error: "This account already exists",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    await query("INSERT INTO users (username, password) VALUES (?,?)", [
      username,
      hashed,
    ]);
    return res.send({
      data: "Successfully signed up",
      success: true,
      error: null,
    });
  } catch (err) {
    return res.send({
      data: null,
      success: false,
      error: "Something went wrong, please try again later.",
    });
  }
}

module.exports = { login, signup };
