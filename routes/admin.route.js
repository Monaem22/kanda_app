const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const { adminAuthorization } = require("../middlewares/auth.middleware");

router.use(adminAuthorization)

router.post("/create_new_admin" ,adminController.create_new_admin)
router.get("/get_all_admins" ,adminController.get_all_admins)
router.delete("/delete_admin/:admin_id",adminController.delete_admin)
router.get("/get_one_admin/:admin_id",adminController.get_one_admin)
router.put("/edit_admin/:admin_id",adminController.edit_admin)
// user
router.post("/add_user" ,adminController.add_user)
router.get("/get_all_users" ,adminController.get_all_users)
router.delete("/delete_user/:user_id",adminController.delete_user)
router.get("/get_one_user/:user_id",adminController.get_one_user)
router.put("/edit_user/:user_id",adminController.edit_user)

module.exports = router;
