const Product = require("../../model/product.model");
const filterStatus = require("../../helper/filterStatus");
const Search = require("../../helper/search");
const ProductPageModule = require("../../helper/pagination");
const systemConfig = require("../../config/systems");

//[GET] /admin/product
module.exports.product = async (req, res)=>{ 
    //Gọi hàm thực hiện bộ lọc button
    const filter = filterStatus(req.query);
    //console.log(filter);
    let find = {
        deleted: false
    }
    if(req.query.status === "deleted"){
        find.deleted = true;
    }
    //Tìm kiếm trạng thái 
    if(req.query.status){
        find.status = req.query.status;
    }
    //Phân trang
    const countProduct = await Product.countDocuments(find);
    let objectPagination = {
        indexPage: 1,
        limitItem: 4
    }
    const paginationPage = ProductPageModule(objectPagination, req.query, countProduct );
    //console.log(paginationPage.numberPage);
    
    //Tìm kiếm sản phẩm
    const search = Search(req.query);
    if(search.regex){
        find.title = search.regex;
    }
    //console.log(search);

    //Hiển thị sản phẩm ra giao diện
    const productPage = await Product.find(find).sort({position: "desc"}).limit(paginationPage.limitItem).skip(paginationPage.skip);
    res.render('admin/page/product/index', {
        titlePage: "Trang danh sách sản phẩm",
        product: productPage,
        filterStatus: filter,
        keyword: search.keyword,
        pagination: paginationPage
    });
} 

//[PATCH] /admin/product/changeStatus/:status/:id
module.exports.changeStatus = async (req, res)=>{
    console.log(req.params);//params: là biến chứa các dữ liệu động 
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status:status});
    req.flash("success", "Cập nhập trạng thái sản phẩm thành công");
    res.redirect('back');
}

//[PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) =>{
    console.log(req.body);
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    console.log(ids);

    switch (type) {
        case "active":
            await Product.updateMany(
                {_id: {$in: ids}}, {status: "active"}
            )
            break;
        case "inactive":
            await Product.updateMany(
                {_id: {$in: ids}}, {status: "inactive"}
            )
            break;
        case "deleted":
            await Product.updateMany(
                {_id: {$in: ids}}, {deleted: true}
            )
            break;
        case "changePosition":
                for (let item of ids) {
                    let [id, position]  = item.split("-");
                    position = parseInt(position);
                    await Product.updateOne({_id: id}, {position:position});
                }
        default: 
            break;
    }
    req.flash("success", "Cập nhập trạng thái sản phẩm thành công");
    res.redirect('back');
}

//[DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res)=>{
    console.log(req.params);//params: là biến chứa các dữ liệu động 
    const id = req.params.id;
    const deleted = true;
    //Xóa vĩnh viễn: 
    //await Product.deleteOne({_id: id});
    await Product.updateOne({_id: id}, {
        deleted: deleted,
        deletedAt: new Date()//Lấy thời gian xóa sản phẩm
    });
    req.flash("success", "Đã xóa sản phẩm");
    res.redirect('back');
}

//[GET] /admin/product/create
module.exports.create = async (req, res) =>{
    res.render("admin/page/product/create", {
        pageItem:"Trang tạo sản phẩm"
    });
}

//[POST] /admin/product/create
module.exports.createItem = async (req, res) =>{
    
    console.log(req.file);
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    const product = await Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`);
}

//[GET] /admin/product/edit
module.exports.edit = async (req, res) =>{
    console.log(req.params);
    try {
        const find= {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        console.log(product);
        res.render('admin/page/product/edit', {
            titlePage: "Trang chỉnh sửa sản phẩm",
            product: product
        }); 
    } catch (error) {
        req.flash("error", "Không có sản phâm như vậy");
        res.redirect(`${systemConfig.prefixAdmin}/product`);
        
    }
    
}

//[PATCH] /admin/product/edit/:id
module.exports.editItem = async (req, res) =>{
    const id = req.params.id;
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({_id : id}, req.body);
        req.flash("wart", "Cập nhật thành công");
        res.redirect(`back`);
    } catch (error) {
        res.redirect("back");
        req.flash("error", "Cập nhật không chính sác");
    }
    
}

//[GET] /admin/product/detail
module.exports.detail = async (req, res)=>{
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        res.render('admin/page/product/detail', {
            titlePage: product.title,
            product: product
        });
    } catch (error) {
        
    }
    
}