const systemConfig = require("../../config/systems");
const ProductCategory = require("../../model/product-category.model");
const filterStatus1 = require("../../helper/product-category/filterStatus");
const search = require("../../helper/product-category/search");
const pagination = require("../../helper/product-category/pagination");
const createTree = require("../../helper/CreateTree");
//[GET] admin/product-category
module.exports.index = async (req, res)=>{
    let find ={
        deleted: false,
        
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
    const countRecord = await ProductCategory.countDocuments();
    const objectPagination = pagination(req.query, countRecord);
    //Kết thúc phân trang

    //Hiện thị sản phẩm theo tiêu chí
    let sortProduct = {};
    if(req.query.sortKey && req.query.valueKey){
        sortProduct[req.query.sortKey] = req.query.valueKey;
    }
    else{
        sortProduct.position = "asc";
    }
    //Kết thúc hiển thị sản phẩm theo tiêu chí
    let cnt = 0;
    function createTree(arr, parent_id = ""){
        const tree = [];
        arr.forEach(item => {
            if(item.parent_id == parent_id){
                cnt++;
                const newItem = item;
                newItem.index = cnt;
                const children = createTree(arr, item._id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
                
            }
        });
        return tree;
    }
    const record = await ProductCategory.find(find).sort(sortProduct).limit(objectPagination.limitItem).skip(objectPagination.skip);
    const newrecord = createTree(record);
    res.render('admin/page/product-category/index', {
        titlePage:"Trang danh mục sản phẩm",
        productCategory : newrecord,
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

//[GET] admin/product-category/create
module.exports.create = async (req, res)=>{
    let find = {
        deleted: false
    };
    let cnt = 0;
    function createTree(arr, parent_id = ""){
        const tree = [];
        arr.forEach(item => {
            if(item.parent_id == parent_id){
                cnt++;
                const newItem = item;
                newItem.index = cnt;
                const children = createTree(arr, item._id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
                
            }
        });
        return tree;
    }
    const records = await ProductCategory.find(find);
    const newrecord = createTree(records);
    res.render("admin/page/product-category/create", {
        pageItem:"Trang tạo danh mục sản phẩm",
        records: newrecord
    });
}

//[POST] admin/product-category/create
module.exports.createItem = async (req, res)=>{
    if(req.body.position == ""){
        const countProduct = await ProductCategory.countDocuments();
        req.body.position = countProduct + 1;
    }
    const product = await ProductCategory(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

//[GET] admin/product-category/detail/:id
module.exports.detail = async (req, res) =>{
    let find ={
        _id: req.params.id
    }
    const product = await ProductCategory.findOne(find);
    res.render('admin/page/product-category/detail', {
        titlePage: "Trang chi tiết sản phẩm",
        product: product
    })
}

//[GET] admin/product-category/edit/:id
module.exports.edit = async (req, res) =>{
    try {
        let find ={
            _id: req.params.id,
            deleted: false
        }
        let find1 = {
            deleted: false
        }
        let cnt = 0;
        function createTree(arr, parent_id = ""){
            const tree = [];
            arr.forEach(item => {
                if(item.parent_id == parent_id){
                    cnt++;
                    const newItem = item;
                    newItem.index = cnt;
                    const children = createTree(arr, item._id);
                    if(children.length > 0){
                        newItem.children = children;
                    }
                    tree.push(newItem);
                    
                }
            });
            return tree;
        }
        const product = await ProductCategory.findOne(find);
        const record = await ProductCategory.find(find1);
        const newrecord = createTree(record);
        res.render('admin/page/product-category/edit', {
            titlePage: "Trang chỉnh sửa sản phẩm",
            product: product,
            record: newrecord
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category/404`)
    }
    
}

//[PATCH] admin/product-category/edit/:id
module.exports.editItem = async (req, res) =>{
    const id = req.params.id;
    await ProductCategory.updateOne({_id: id}, req.body);
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    
}

//[GET] admin/product-category/404
module.exports.page404 = async (req, res)=>{
    res.render('admin/page/product-category/404', {
        titlePage: "404",
    })
}
