const mongoose = require("mongoose");
const generate = require("../helper/generate");

const passwordForgotSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: {
        type: Date,
        expires: 0
    }
},
{
    timestamps: true
});

  

const PasswordForgot = mongoose.model('PasswordForgot', passwordForgotSchema, "passwordForgot");
//kết nối ra bên ngoài
module.exports = PasswordForgot;