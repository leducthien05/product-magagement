const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
const newPrice = require("../../helper/newPriceProduct");
const getCategory = require("../../helper/getCategory")

// GET /product
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProducts = newPrice.newPrice(products);
    res.render('client/page/product/index', {
        titlePage: "Trang sản phẩm",
        products: newProducts
    });
}

//[GET]/product/detail/:slugProduct
module.exports.detail = async (req, res) =>{
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        
        const product = await Product.findOne(find);
        
        if(product.product_category_id){
            const category = await ProductCategory.findOne({
                deleted: false,
                status: "active",
                _id: product.product_category_id
            });
            product.category = category;
        }
        product.newPrice = newPrice.newPriceProduct(product);
        res.render('client/page/product/detail', {
            titlePage: product.title,
            productDetail: product
        }); 
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
    
}

//[GET]/product/:slugCategory
module.exports.category = async (req, res)=>{
    try {
        console.log(req.params.slugCategory);
        const category = await ProductCategory.findOne({
            status: "active",
            deleted: false,
            slug: req.params.slugCategory
        });
        //Lấy tất cả danh mục của sản phẩm 
        const listCategory = await getCategory.getCategory(category.id);
        const listCategoryId = listCategory.map(item =>item.id);
        const product = await Product.find({
            deleted: false,
            product_category_id: { $in: [category.id, ...listCategoryId] }
        });

        const newProducts = newPrice.newPrice(product);
        res.render("client/page/product/index", {
            title: category.title,
            products : newProducts
        });
    } catch (error) {
        console.log(error);
        res.send("Sản phẩm không tồn tại");
    }
}