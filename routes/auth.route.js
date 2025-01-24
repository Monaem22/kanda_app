const router = require("express").Router();
const authControl = require("../controllers/auth.controller");
const { authentication } = require("../middlewares/auth.middleware");

router.post("/main/login", authControl.login )
router.get("/logout",authentication, authControl.logout)
router.post("/user_login", authControl.user_login)

// router.post("/forgetPassword", authControl.forgetPassword);
// router.post("/verifyPassResetCode", authControl.verifyPassResetCode);
// router.put("/resetPassword", authControl.resetPassword);

module.exports = router;
