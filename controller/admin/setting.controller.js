const settingGeneral = require("../../model/setting-genaral.model");
const General = require("../../model/setting-genaral.model");

module.exports.general = async (req, res)=>{
    const record = await General.findOne();

    res.render("admin/page/setting/general", {
        titlePage: "Cài đặt chung",
        settingGeneral: record
    });
}

module.exports.generalPatch = async (req, res)=>{
    const record = await General.findOne();
    if(record){
        await record.updateOne({
            _id: record._id
        }, req.body);
    }else{
        const settingGeneral = new General(req.body);
        await settingGeneral.save();
    }
    
    res.redirect("back");
}