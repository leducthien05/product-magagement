const Product = require("../../model/product.model");
const newPrice = require("../../helper/newPriceProduct");

module.exports.index = async (req, res) => {
    //Lấy sản phẩm nổi bật
    const products = await Product.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).limit(6);
    
    const newProducts = newPrice.newPrice(products);
    res.render('client/page/home/index', {
        titlePage: "Trang chủ",
        productsFeatured: newProducts
    });
}