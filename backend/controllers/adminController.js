const admin = require("../models/admin");
const bcrypt = require("bcrypt")


//for set admin account here is the setAdmin method
const setAdmin = async (req, res) => {
    try {
        let data = await new admin(req.body)
        data.save().then(data => {
            console.log(data)
            res.json(data);
        })
    }
    catch (err) {
        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);
    }
}

//this is the method for admin password updation
const updateAdminPassword = async (req, res) => {

    try {
        let hashpass = await bcrypt.hash(req.body.password, 10);
        let data = await admin.findOneAndUpdate({ email: req.body.email }, { $set: { password: hashpass } }, { new: true })
        if (data) {

            console.log(data)
            res.json({ message: "password updated successfully", redirect: true })
        }
        else {
            res.json({ message: "intrenal server error please try again later", redirect: false })
        }
    }
    catch (err) {

        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);
    }

}


const adminLogin = async (req, res) => {

    try {
        let userData = await admin.findOne({ email: req.body.email })
        const checker = (err, isMatch) => {
            if (isMatch) {
                res.json({ adminlogin: true, message: "login successful", userData })
            } else {
                res.send({ adminlogin: false, message: "password was incorrect" })
            }
        }


        if (userData) {
            userData.comparePassword(req.body.password, checker)
        }
        else {
            res.send({ adminlogin: false, message: "User Not Found" })
        }

    }
    catch (err) {
        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);
    }

}



module.exports = { setAdmin, adminLogin, updateAdminPassword }