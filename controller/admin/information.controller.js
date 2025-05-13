const Accounts = require("../../model/account.model");
const systemConfig = require("../../config/systems");
const md5 = require('md5');

module.exports.index = async (req, res)=>{
    res.render("admin/page/my-account/index", {
        titlePage: "Thông tin cá nhân"
    });
}

module.exports.edit = async (req, res)=>{
    res.render("admin/page/my-account/edit", {
        titlePage: "Chỉnh sửa thông tin cá nhân"
    });
}

module.exports.editItem = async (req, res)=>{
    const id = res.locals.user.id;
    const emailExist = await Accounts.findOne({
        deleted: false,
        _id: {$ne: id},
        email: req.body.email
    });
    if(emailExist){
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    }else{
        if(req.body.password == ""){
            delete req.body.password
        }else{
            req.body.password = md5(req.body.password);
        }
        await Accounts.updateOne({_id:id }, req.body);
        req.flash("success", "Cập nhật thành công");
    }
    res.redirect("back");
}