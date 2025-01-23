const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const { adminAuthorization } = require("../middlewares/auth.middleware");


router.post("/create_new_admin",adminAuthorization ,adminController.create_new_admin)
router.get("/get_all_admins",adminAuthorization ,adminController.get_all_admins)
router.delete("/delete_admin/:admin_id",adminAuthorization ,adminController.delete_admin)
router.get("/get_one_admin/:admin_id",adminAuthorization ,adminController.get_one_admin)
router.put("/edit_admin/:admin_id",adminAuthorization ,adminController.edit_admin)

module.exports = router;
