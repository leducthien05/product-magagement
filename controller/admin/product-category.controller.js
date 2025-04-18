const systemConfig = require("../../config/systems");
const ProductCategory = require("../../model/product-category.model");
const filterStatus1 = require("../../helper/product-category/filterStatus");
const search = require("../../helper/product-category/search");
const pagination = require("../../helper/product-category/pagination");
//[GET] admin/product-category
module.exports.index = async (req, res)=>{
    let find ={
        deleted: false
    }
    //Hiện thị trạng thái sản phẩm
    const filterStatus = filterStatus1(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }
    // Kết thúc in trạng thái sản phẩm

    //Tìm kiếm sản phẩm
    const searchProduct = search(req.query);
    if(req.query.keyword){
        find.title = searchProduct.regex;
    }
    //Kết thúc tìm kiếm sản phẩm

    //Phân trang
    const countRecord = await ProductCategory.countDocuments(find);
    const objectPagination = pagination(req.query, countRecord);
    //Kết thúc phân trang

    const record = await ProductCategory.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    res.render('admin/page/product-category/index', {
        titlePage:"Trang danh mục sản phẩm",
        productCategory : record,
        filterStatus: filterStatus,
        keyword: searchProduct.key,
        pagination: objectPagination
    })
}

//[POST] admin/product-category/:status/:id
module.exports.changeStatus = async (req, res)=>{
    const status = req.params.status;
    const id = req.params.id;
    console.log(req.params.id);
    console.log(req.params.status);
    await ProductCategory.updateOne({_id: id}, {status:status});
    res.redirect("back");
}

//[POST] admin/product-category/change-multi
module.exports.changeMulti = async (req, res)=>{

    res.send("OK");
}

module.exports.create = async (req, res)=>{
    res.render("admin/page/product-category/create", {
        pageItem:"Trang tạo danh mục sản phẩm"
    });
}

module.exports.createItem = async (req, res)=>{

    if(req.body.position == ""){
        const countProduct = await ProductCategory.countDocuments();
        req.body.position = countProduct + 1;
    }
    const product = await ProductCategory(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

