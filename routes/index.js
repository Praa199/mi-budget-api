const router = require("express").Router();
const authRoutes = require("./auth");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

const protectedRoutes = require("./protected");

router.use("/protected", protectedRoutes);

const profileRoutes = require("./profile");

router.use("/profile", profileRoutes);

module.exports = router;
