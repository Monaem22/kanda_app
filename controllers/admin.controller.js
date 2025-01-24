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
            admin ? res.status(200).send({ message: "تم حذف الادمن بنجاح" }) 
            : res.status(404).send({ message: "ادمن غير موجود" }) ;
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    get_one_admin: async (req, res) => {
        try {
            const admin = await user_model.findById(req.params.admin_id);
            admin ? res.status(200).send(admin) 
            : res.status(404).send({ message: "ادمن غير موجود" }) ;
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    edit_admin: async (req, res) => {
        try {
            if (req.body.password ){
                req.body.password = await bcrypt.hash(req.body.password, 12) 
            }
            const admin = await user_model.findByIdAndUpdate(req.params.admin_id, req.body, { new: true });
            admin ? res.status(200).send({ message: "تم تعديل الادمن بنجاح" }) 
            : res.status(404).send({ message: "ادمن غير موجود" }) ;
            await admin.save()
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    add_user : async (req , res ) => {
        try {
            const {nationality ,birth_date ,national_id,last_name ,name} = req.body
            const user = await user_model.create(req.body)
            res.status(200).send({ message: "تم اضافة المستخدم بنجاح" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
}

module.exports = admin_controller