const Product = require("../../model/product.model");
const Accounts = require("../../model/account.model")
const ProductCategory = require("../../model/product-category.model");
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

    //sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position = "desc";
    }
    //end sort
    //Tìm kiếm sản phẩm
    const search = Search(req.query);
    if(search.regex){
        find.title = search.regex;
    }
    //console.log(search);

    //Lấy danh sách sản phẩm
    const productPage = await Product.find(find).sort(sort).limit(paginationPage.limitItem).skip(paginationPage.skip);

    //Người tạo sản phẩm lưu vào lịch sử sửa đổi trang web
    
    for(const product of productPage){
        //Lấy thông tin người tạo 
        const user = await Accounts.findOne({
            deleted: false,
            _id: product.createdBy.account_ID
        });

        if(user){
            product.userCreate = user.fullname;
        }

        // Lấy thông tin người chỉnh sửa cuối cùng
        const updated = product.updatedBy[product.updatedBy.length -1];
        if(updated){
            const userUpdate = await Accounts.findOne({
                deleted: false,
                _id: updated.account_ID
            });

            if(userUpdate){
                updated.NameUpdate = userUpdate.fullname;
            }
        }
    }


    //Hiển thị sản phẩm ra giao diện
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
    console.log(req.params.id);
    console.log(req.params.status);
    const status = req.params.status;
    const id = req.params.id;

    const updated = {
        account_ID: res.locals.user.id,
        updatedAt: new Date
    }

    await Product.updateOne(
        {_id: id}, 
        {
            status:status,
            $push: { updatedBy: updated }
        }
    );
    req.flash("success", "Cập nhập trạng thái sản phẩm thành công");
    res.redirect("back");
}

//[PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) =>{
    console.log(req.body);
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    console.log(ids);

    const updated  = {
        account_ID: res.locals.user.id,
        updatedAt: new Date
    };

    switch (type) {
        case "active":
            await Product.updateMany(
                {_id: {$in: ids}}, {
                    status: "active",
                    $push: { updatedBy: updated }
                }
            )
            break;
        case "inactive":
            await Product.updateMany(
                {_id: {$in: ids}}, {
                    status: "inactive",
                    $push: { updatedBy: updated }
                }
            )
            break;
        case "deleted":
            await Product.updateMany(
                {_id: {$in: ids}}, 
                {
                    deleted: true,
                    deletedBy: {
                        deletedAt: new Date(),
                        account_ID: res.locals.user.id
                    }
                }
            )
            break;
        case "changePosition":
                for (let item of ids) {
                    let [id, position]  = item.split("-");
                    position = parseInt(position);
                    await Product.updateOne(
                        {_id: id}, 
                        {
                            position:position,
                            $push: { updatedBy: updated }
                    });
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
        // deletedAt: new Date()//Lấy thời gian xóa sản phẩm
        deletedBy: {
            account_ID: res.locals.user.id,
            deletedAt: new Date()
        }
    });
    req.flash("success", "Đã xóa sản phẩm");
    res.redirect('back');
}

//[GET] /admin/product/create
module.exports.create = async (req, res) =>{
    const find ={
        deleted: false
    }
    function CreateTree(arr, parent_id = ""){
        const tree = [];
        arr.forEach(item => {
            if(item.parent_id == parent_id){
                const newItem = item;
                const children = CreateTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const product = await ProductCategory.find(find);
    const record = CreateTree(product);
    res.render("admin/page/product/create", {
        pageItem:"Trang tạo sản phẩm",
        record: record
    });
}

//[POST] /admin/product/create
module.exports.createItem = async (req, res) =>{
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

    req.body.createdBy = {
        account_ID: res.locals.user.id
    };

    const product = await Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`);
}

//[GET] /admin/product/edit
module.exports.edit = async (req, res) =>{
    const find ={
        deleted: false
    }
    function CreateTree(arr, parent_id = ""){
        const tree = [];
        arr.forEach(item => {
            if(item.parent_id == parent_id){
                const newItem = item;
                const children = CreateTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const product = await ProductCategory.find(find);
    const record = CreateTree(product);
    try {
        const find= {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        console.log(product);
        res.render('admin/page/product/edit', {
            titlePage: "Trang chỉnh sửa sản phẩm",
            product: product,
            record: record
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

    const updated  = {
        account_ID: res.locals.user.id,
        updatedAt: new Date
    };

    try {
        await Product.updateOne(
            {_id : id},
            {
                ...req.body,
                $push: { updatedBy: updated }
            }
        );
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
