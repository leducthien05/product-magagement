const Product = require("../../model/product.model");
const newPrice = require("../../helper/newPriceProduct");
const search = require("../../helper/search");

module.exports.search = async (req, res)=>{
    const keyword = req.query.keyword;
    let product = [];
    if(keyword){
        const regex = new RegExp(keyword, "i");
        const resultSearch = await Product.find({
            title: regex,
            deleted: false,
            status: "active"
        });
        product = newPrice.newPrice(resultSearch);
    }
    res.render('client/page/search/index', {
       titlePage: "Kết quả tìm kiếm",
       keyword: keyword,
       product: product
    })
}