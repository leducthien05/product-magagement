const createTree = require("../../helper/CreateTree");
const ProductCategory = require("../../model/product-category.model");

module.exports.category = async (req, res, next)=>{
    const productCategory = await ProductCategory.find({
        deleted: false
    });
    const newproductCategory = createTree(productCategory);

    res.locals.productMiddleware = newproductCategory;
    next();
}   