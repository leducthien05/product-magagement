const Product = require("../../model/product.model");

// GET /product
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProducts = products.map(item =>{
        item.priceNew = item.price * ((100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    });
    res.render('client/page/product/index', {
        titlePage: "Trang sản phẩm",
        products: newProducts
    })
}

//[GET]/product/:detail
module.exports.detail = async (req, res) =>{
    console.log(req.params.slug);
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find);
        res.render('client/page/product/detail', {
            titlePage: product.title,
            product: product
        }); 
    } catch (error) {
        res.redirect('back');
    }
    
}