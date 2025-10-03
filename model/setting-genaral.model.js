const mongoose = require("mongoose");

const setting_genaralSchema = new mongoose.Schema(
    {
        websiteName: String,
        email: String,
        logo: String,
        phone:String,
        address: String,
        copyright: String
    },
    {
        timestamps: true
    }
);

const settingGeneral = mongoose.model('settingGeneral', setting_genaralSchema, "setting-general");
//kết nối ra bên ngoài
module.exports = settingGeneral;