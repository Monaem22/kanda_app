const user_model = require("../models/user.model")
const bcrypt = require("bcrypt")


const admin_controller = {
    create_new_admin: async (req, res) => {
        try {
            const existingUser = await user_model.findOne({ name: req.body.name })
            if (existingUser) {
                return res.status(403).send({ error: "name is already exists..please enter another name" });
            }
            const new_admin = await user_model.create({ ...req.body, role: "admin" });

            res.status(201).send({
                message: "تم اضافة ادمن جديد بنجاح",
                admin_name: new_admin.name,
                admin_role: new_admin.role,
            });

        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    get_all_admins: async (req, res) => {
        try {
            const admins = await user_model.find({ role: "admin" });
            res.status(200).send(admins);
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    delete_admin: async (req, res) => {
        try {
            const admin = await user_model.findByIdAndDelete(req.params.admin_id);
            return res.status(admin ? 200 : 404).send({ message: admin ? "تم حذف الادمن بنجاح" : " ادمن غير موجود او تم حذفه مسبقا " });
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    get_one_admin: async (req, res) => {
        try {
            const admin = await user_model.findById(req.params.admin_id).select('-password -__v');
            if (!admin) return res.status(404).send({ message: "ادمن غير موجود" });
            res.status(200).send(admin);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    edit_admin: async (req, res) => {
        try {
            if (req.body.password ){
                req.body.password = await bcrypt.hash(req.body.password, 12) 
            }
            const existingUser = await user_model.findOne({ name: req.body.name ,role:"admin" })
            if (existingUser) {
                return res.status(403).send({ error: "name is already exists..please enter another name" });
            }
            const admin = await user_model.findByIdAndUpdate(req.params.admin_id, req.body, { new: true });
            return res.status(admin ? 200 : 404).send({ message: admin ? "تم تعديل الادمن بنجاح" :" ادمن غير موجود للتعديل او تم حذفه مسبقا " });
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    // user
    add_user : async (req , res ) => {
        try {
            const {national_id ,name} = req.body
            const existingUser = await user_model.findOne({ name: name , role:"user" , national_id:national_id})
            if (existingUser) {
                return res.status(403).send({ error: "  هذا المستخدم موجود بالفعل " });
            }
            await user_model.create(req.body)
            res.status(200).send({ message: "تم اضافة المستخدم بنجاح" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    edit_user : async (req , res ) => {
        try {
            const existingUser = await user_model.findOne({ national_id: req.body.national_id ,role:"user" })
            if (existingUser) {
                return res.status(403).send({ error: "national id is already exists..please enter another national id" });
            }
            const user = await user_model.findByIdAndUpdate(req.params.user_id , req.body)
            return res.status(user ? 200 : 404).send({ message: user ? "تم تعديل المستخدم بنجاح" :" المستخدم غير موجود للتعديل او تم حذفه مسبقا " });

        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    get_all_users : async (req , res ) => {
        try {
            const users = await user_model.find({ role: "user" });
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    delete_user: async (req, res) => {
        try {
            const user = await user_model.findByIdAndDelete(req.params.user_id);
            return res.status(user ? 200 : 404).send({ message: user ? "تم حذف المستخدم بنجاح" : " مستخدم غير موجود او تم حذفه مسبقا " });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    get_one_user : async (req , res ) => {
        try {
            const user = await user_model.findOne({ _id:req.params.user_id, role: "user"})
            if (!user) return res.status(404).send({ message: "مستخدم غير موجود" });
            res.status(200).send(user);
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
}

module.exports = admin_controller