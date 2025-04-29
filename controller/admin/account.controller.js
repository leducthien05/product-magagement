const Accounts = require("../../model/account.model");
const Roles = require("../../model/role.model")
const systemConfig = require("../../config/systems");
const md5 = require('md5');

module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    };
    const record = await Accounts.find(find).select("-password -token");
    for (const item of record) {
        const role = await Roles.findOne({
            deleted: false,
            _id: item.roles_ID
        });
        item.role = role;
    }
    res.render('admin/page/accounts/index', {
        titlePage: "Trang tạo mới sản phẩm",
        record: record
    });
}

module.exports.create = async (req, res)=>{
    const find = {
        deleted: false
    };
    const record = await Roles.find(find);
    res.render("admin/page/accounts/create", {
        titlePage: "Trang tạo mới sản phẩm",
        record: record
    });
}

module.exports.createItem = async (req, res)=>{
    try {
        const emailExist = await Accounts.findOne({
            email: req.body.email,
            deleted: false
        });
        console.log(emailExist);
        if(emailExist){
            req.flash("error", "email đã tồn tại!");
            res.redirect("back");
        }
        else{
            req.body.password = md5(req.body.password);
            const record = new Accounts(req.body);
            await record.save();
            res.redirect(`${systemConfig.prefixAdmin}/accounts`);
            }
    
    } catch (error) {
        res.redirect("back");
    }
}

module.exports.edit = async (req, res)=>{
    const find = {
        deleted: false,
        _id: req.params.id
    };
    const role = await Roles.find({
        deleted: false,
    });
    const record = await Accounts.findOne(find);
    res.render("admin/page/accounts/edit", {
        titlePage: "Trang chỉnh sửa sản phẩm",
        record: record,
        roles: role
    });
}

module.exports.editItem = async (req, res)=>{
    try {
        const id = req.params.id;
        const emailExist = await Accounts.findOne({
            _id: {
                $ne: id
            },
            email: req.body.email,
            deleted: false
        });
        //console.log(emailExist);
        if(emailExist){
            req.flash("error", "email đã tồn tại!");
            res.redirect("back");
        }else{
            if(req.body.password){
                req.body.password = md5(req.body.password);
            }else{
                delete req.body.password;
            }
            
            await Accounts.updateOne({_id: id}, req.body);
            res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        }
    } catch (error) {
        res.redirect("back");
    }
}