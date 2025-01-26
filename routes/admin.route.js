const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const { adminAuthorization , authentication } = require("../middlewares/auth.middleware");
const uploading = require("../middlewares/uploud.middleware");

// available for user

router.use(adminAuthorization)

router.post("/create_new_admin" ,adminController.create_new_admin)
router.get("/get_all_admins" ,adminController.get_all_admins)
router.delete("/delete_admin/:admin_id",adminController.delete_admin)
router.get("/get_one_admin/:admin_id",adminController.get_one_admin)
router.put("/edit_admin/:admin_id",adminController.edit_admin)
//on user
router.post("/add_user" ,adminController.add_user)
router.get("/get_all_users" ,adminController.get_all_users)
router.delete("/delete_user/:user_id",adminController.delete_user)
router.get("/get_one_user/:user_id",adminController.get_one_user)
router.put("/edit_user/:user_id",adminController.edit_user)
router.post("/Update_Image/:user_id" ,uploading.img_Uploading().single("profile_image"),adminController.Update_Image)

router.post("/add_member/:user_id",adminController.add_member)
router.delete("/delete_member/:user_id/:member_id",adminController.delete_member)
router.get("/get_all_members/:user_id",adminController.get_all_members)


module.exports = router;
