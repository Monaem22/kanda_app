const user_model = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const crypto = require("crypto");

const authUserController = {
    login: async (req, res) => {
        try {
            const { name, password } = req.body;
            const user = await user_model.findOne({ name })
            if (!user) {
                return res.status(403).json({ message: " الاسم او الباصورد غير صحيح " });
            }
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return res.status(403).json({ message: " Inavlid name or password" });
            }

            const token = await jwt.sign(
                { id: user._id, role: user.role },
                process.env.secret_key,
                { expiresIn: '2h' }
            )
            res.cookie("access_token", `barear ${token}`,
                {
                    httpOnly: true,// Protect from client-side scripts
                    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',//Testing for Secure HTTPS Connections
                    // secure: process.env.NODE_ENV === 'production' ? true : req.secure || req.headers['x-forwarded-proto'] === 'https' // Secure only in production for HTTPS
                    sameSite: 'strict',// Prevent CSRF attacks
                    // maxAge: 30 * 60 * 1000  , //after 30 minutes in milliseconds of inactivity.
                    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                }
            )

            return res.status(200).json({ message: " تم تسجيل الدخول بنجاح ", token })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    user_login : async (req, res) => {
        try {
            const { name, last_name , nationality , birth_date , national_id } = req.body;
            const user = await user_model.findOne({ name ,national_id})
            if (!user) {
                return res.status(403).json({ message: " خطا في البيانات أعد كتابتها لتتمكن من الدخول " });
            }
            if (user.nationality != nationality && user.national_id != national_id && user.birth_date != birth_date && user.last_name != last_name )
            {
                return res.status(403).json({message : " بيانات المستخدم غير صحيحه "})
            }
            const token = await jwt.sign(
                { id: user._id, role: user.role },
                process.env.secret_key,
                { expiresIn: '2h' }
            )
            res.cookie("access_token", `barear ${token}`,
                {
                    httpOnly: true,// Protect from client-side scripts
                    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',//Testing for Secure HTTPS Connections
                    // secure: process.env.NODE_ENV === 'production' ? true : req.secure || req.headers['x-forwarded-proto'] === 'https' // Secure only in production for HTTPS
                    sameSite: 'strict',// Prevent CSRF attacks
                    // maxAge: 30 * 60 * 1000  , //after 30 minutes in milliseconds of inactivity.
                    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                }
            )

            return res.status(200).json({ message: " تم تسجيل الدخول بنجاح ", token })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            req.user.active = false;
            await req.user.save()
            res.clearCookie("access_token");
            res.status(200).send("you are loged out")
            
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },

    // forgetPassword: async (req, res) => {
    //     try {
    //         var userDoc = await user_model.findOne({ name: req.body.name });
    //         if (!userDoc) {
    //             return res.status(403).send({ message: "name not found" });
    //         }
    //         const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    //         const hashResetCode = crypto.createHash("sha256")
    //             .update(resetCode)
    //             .digest("hex");

    //         userDoc.passwordResetCode = hashResetCode;
    //         userDoc.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    //         userDoc.passwordResetVerified = false;
    //         await userDoc.save();

    //         var message = ` HI ${userDoc.userName} ,
    //         we received to rest the password on your account \n
    //         ${resetCode} thanks `;
    //         console.log(resetCode);

    //         await sendname({
    //             name: userDoc.Gmail_Acc,
    //             subject: `your password reset code(valid for 10 min)`,
    //             text: message,
    //         });

    //         return res.redirect('/reset-code.html');
    //     } catch (error) {
    //         userDoc.passwordResetCode = undefined;
    //         userDoc.passwordResetExpires = undefined;
    //         userDoc.passwordResetVerified = undefined;
    //         await userDoc.save();

    //         res.status(500).send({ message: error.message })
    //     }
    // },
    // verifyPassResetCode: async (req, res) => {
    //     try {
    //         const {resetCode} = req.body ;
            
    //         if (!resetCode) {
    //             return res.status(404).send({ message: "no Reset code entered" });
    //         }

    //         const hashedResetCode = crypto
    //             .createHash("sha256")
    //             .update(resetCode)
    //             .digest("hex");
                
    //         const user = await user_model.findOne({
    //             passwordResetCode: hashedResetCode,
    //             passwordResetExpires: { $gt: Date.now() },
    //         });

    //         if (!user) {
    //             return res.status(404).send({ message: "Reset code invalid or expired" });
    //         }

    //         user.passwordResetVerified = true;
    //         await user.save();

    //         return res.redirect('/reset-pass.html');
    //     } catch (error) {
    //         res.status(500).send({ message: error.message })
    //     }
    // },
    // resetPassword: async (req, res) => {
    //     try {
    //         const user = await user_model.findOne({ name: req.body.name });
    //         if (!user) {
    //             return res.status(404).send({ message: `There is no user with name ${req.body.name}` });
    //         }
    //         if (!user.passwordResetVerified) {
    //             return res.status(404).send({ message: "Reset code not verified" });
    //         }

    //         const token = await jwt.sign(
    //             { id: user._id, role: user.role },
    //             process.env.secret_key,
    //             { expiresIn: '12h' } 
    //         )
    //         res.cookie("access_token", `barear ${token}`,
    //             {
    //                 // httpOnly: true,// Protect from client-side scripts
    //                 secure: req.secure || req.headers['x-forwarded-proto'] === 'https',//Testing for Secure HTTPS Connections
    //                 // secure: process.env.NODE_ENV === 'production' ? true : req.secure || req.headers['x-forwarded-proto'] === 'https' // Secure only in production for HTTPS
    //                 sameSite: 'strict',// Prevent CSRF attacks
    //                 // maxAge: 30 * 60 * 1000  , //after 30 minutes in milliseconds of inactivity.
    //                 expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
    //                 // expires: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
    //             }
    //         )
            
    //         user.active = true;
    //         user.password = req.body.newPassword;
    //         user.passwordResetCode = undefined;
    //         user.passwordResetExpires = undefined;
    //         user.passwordResetVerified = undefined;
    //         // user.tokens.push(token)
    //         await user.save();  

    //         return res.status(200).json({ message: "reset the password and is accepted", token })
    //     } catch (error) {
    //         res.status(500).send({ message: error.message })
    //     }
    // },
} 

module.exports = authUserController;
