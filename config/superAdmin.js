const user_model = require("../models/user.model")
const mongoose = require("mongoose");


async function superAdmins() {
    try {
        // Check connection state before proceeding
        if (mongoose.connection.readyState !== 1) {
            console.error("Mongoose not connected. Please wait...");
            return;
        }
        const name = "KEA";
        const password = "99aA";
        const role = "admin";
        const gmail_Account = "manemosama@gmail.com"
        let existinUser = await user_model.findOne({ name })
        if (existinUser) {
            return console.log({ message: "superAdmin is already existing" });
        }
        await user_model.create({ name, password, role, gmail_Account })
        console.log({ message: "superAdmin is created" });

    } catch (error) {
        console.error('Error during creating superAdmin:', error.message);
    }
}

module.exports = superAdmins;