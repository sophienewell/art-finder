function minmax(req, res, next) {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    username.length < 5 ||
    username.length > 20 ||
    password.length < 5 ||
    password.length > 20
  ) {
    return res.send({
      success: false,
      error: "Username and password must be between 5-20 characters",
      data: null,
    });
  }
  return next();
}

module.exports = minmax;
