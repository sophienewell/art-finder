require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const authRoutes = require("./server/routes/auth.routes");
const favoritesRoutes = require("./server/routes/favorites.routes");
const cookieParser = require("cookie-parser");
const passport = require("./server/config/passport.conf");

app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(__dirname + "/build"));
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(PORT, () => console.log(`Server is running on port" ${PORT}!`));
