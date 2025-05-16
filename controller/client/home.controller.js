const Product = require("../../model/product.model");
const newPrice = require("../../helper/newPriceProduct");

module.exports.index = async (req, res) => {
    //Lấy sản phẩm nổi bật
    const productsFeatured = await Product.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).limit(6);
    
    //Hiển thị danh sách sản phẩm mới nhất
    const newRecord = await Product.find({
        deleted: false,
        status: "active",
    }).sort({position: "desc"}).limit(6);
    const ProductNew = newPrice.newPrice(newRecord);

    const newProducts = newPrice.newPrice(productsFeatured);
    res.render('client/page/home/index', {
        titlePage: "Trang chủ",
        productsFeatured: newProducts,
        newRecord: ProductNew
    });
}