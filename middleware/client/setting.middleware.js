const SettingGeneral = require("../../model/setting-genaral.model");

module.exports.settinggeneral = async (req, res, next) => {
    const record = await SettingGeneral.findOne();
    res.locals.general = record;
    next();
}
