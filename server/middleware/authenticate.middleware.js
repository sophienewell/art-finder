function authenticate(req, res, next) {}
const passport = require("passport");

async function authenticate(req, res, next) {
  passport.authenticate("jwt", (err, user, info) => {
    if (err || !user) {
      return res.send({ data: null, success: false, error: info });
    }
    req.user = user;
    return next();
  })(req, res, next);
}
module.exports = authenticate;
