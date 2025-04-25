const Permission = require("../../model/role.model");
const systemConfig = require("../../config/systems");

//[GET] admin/roles
module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    }
    const roles = await Permission.find(find);
    res.render('admin/page/roles/index', {
        titlePage: "Trang phần quyền",
        roles: roles
    })
}

//[GET] admin/roles/create
module.exports.create = async (req, res)=>{
    res.render('admin/page/roles/create', {
        titlePage: "Trang thêm nhóm quyền"
    });
}

//[POST] admin/roles/create
module.exports.createItem = async (req, res)=>{
    try {
        const newRole = new Permission(req.body);
        await newRole.save();
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        res.redirect("back");
    }
  
}

//[GET] admin/roles/edit
module.exports.edit = async (req, res)=>{
    try {
        const id = req.params.id
        const find = {
            _id: id,
            deleted: false
        }
        const record = await Permission.findOne(find);
        res.render('admin/page/roles/edit', {
            titlePage: "Trang chỉnh sửa nhóm quyền",
            record: record
        });
    } catch (error) {
        res.redirect("back");
    }
    
}

//[PATCH] admin/roles/edit/:id
module.exports.editItem = async (req, res)=>{
    const id = req.params.id;
    console.log(req.body);
    await Permission.updateOne({_id: id}, req.body);
    console.log("Cập nhật thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);

}

//[GET] admin/roles/permission
module.exports.permission = async (req, res)=>{
    let find ={
        deleted: false
    };
    const record = await Permission.find(find);
    res.render('admin/page/roles/permission', {
        titlePage: "Trang phân quyền", 
        record: record
    });
}

//[PATCH] admin/roles/edit/:id
module.exports.permissionItem = async (req, res)=>{
    try {
        const result = JSON.parse(req.body.permission);
        for (let item of result){
            await Permission.updateOne({_id: item.id}, {permission: item.permission});
        }
        req.flash("success","Cập nhật quyền thành công");
        res.redirect("back");
    } catch (error) {
        res.render('admin/page/roles/404', {
            titlePage: "404"
        })
    }
}