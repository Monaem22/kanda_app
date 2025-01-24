const router = require("express").Router();
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");

router.use("/admin", adminRouter)
router.use("/auth", authRouter)


module.exports = router;