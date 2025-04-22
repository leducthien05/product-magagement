const Permission = require("../../model/role.model");
const systemConfig = require("../../config/systems");

//[GET] admin/role
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

//[GET] admin/role/create
module.exports.create = async (req, res)=>{
    res.render('admin/page/roles/create', {
        titlePage: "Trang thêm nhóm quyền"
    });
}

//[POST] admin/role/create
module.exports.createItem = async (req, res)=>{
    try {
        const newRole = new Permission(req.body);
        await newRole.save();
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        res.redirect("back");
    }
  
}

//[GET] admin/role/edit
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

//[PATCH] admin/role/edit/:id
module.exports.editItem = async (req, res)=>{
    const id = req.params.id;
    console.log(req.body);
    await Permission.updateOne({_id: id}, req.body);
    console.log("Cập nhật thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);

}